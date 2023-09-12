import { AnimationDef, animationDefs } from "@/common/animationClassDefinitions";
import _ from "lodash";

// used to trigger the start animation event on the canvas when it's in view
export const ANIMATION_STATE_EVENT_NAME = "animation-state-event";
export const NARRATIVE_ANIMATION_TRIGGER_DECIMAL = 0.85; // at around 0.7 of the screen height, the animation should start
export const NORMAL_ANIMATION_TRIGGER_DECIMAL = 0.9;

export const enum AnimationState {
    BEFORE_START = "BEFORE START",
    RUNNING = "RUNNING",
    PAUSED = "PAUSED",
}
const newAnimationStateEvent = (animationState: AnimationState) => {
    return new CustomEvent<AnimationState>(ANIMATION_STATE_EVENT_NAME, {
        detail: animationState,
        bubbles: true, // the event can bubble up through the DOM tree
        cancelable: true, // the event can be cancelled using preventDefault()
        composed: false, // the event does not propagate outside of the shadow DOM
    });
};

interface AnimationDescription {
    element: HTMLElement;
    elementTop: () => number; // The reason why this is a function, rather than a number, is because the element's position can change after canvas elements are rendered
    animationDef: AnimationDef;
    animationDelay: number;
    text: string; // for debugging purposes
    isPersistentAnimation: boolean; // these are typically canvas elements that run forever. We should pause them when they scroll off-screen
}

const getAnimationDescriptions = (): AnimationDescription[] => {
    const animationDefList: AnimationDef[] = Array.from(Object.values(animationDefs));

    // 1) get all elements
    const animationDescriptions: AnimationDescription[] = [];
    for (const animationDef of animationDefList) {
        // I am using querySelectorAll since getElementsByClassName doesn't return all elements
        // Why? it's cause getElementsByClassName returns a live collection: https://stackoverflow.com/a/31311967/4647924
        const elements = document.querySelectorAll(`.${animationDef.initialClass}`);
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            animationDescriptions.push(getAnimationDescription(element, animationDef));
        }
    }

    // 2) sort by y-position, then x-position
    animationDescriptions.sort((animationDef1, animationDef2) => {
        const y1 = animationDef1.elementTop();
        const y2 = animationDef2.elementTop();

        if (y1 !== y2) {
            return y1 - y2;
        }

        const x1 = animationDef1.element.getBoundingClientRect().left;
        const x2 = animationDef2.element.getBoundingClientRect().left;
        return x1 - x2;
    });
    return animationDescriptions;
};

const getAnimationDescription = (
    element: HTMLElement,
    animationDef: AnimationDef
): AnimationDescription => {
    return {
        text: element.innerText,
        element,
        elementTop: () => element.getBoundingClientRect().top + document.documentElement.scrollTop,
        animationDef,
        animationDelay: getAnimationDelay(element),
        isPersistentAnimation: isPersistentAnimation(element),
    };
};

const isPersistentAnimationStr = "is-persistent-animation";
const isPersistentAnimation = (element: HTMLElement) => {
    for (const elementClass of element.classList) {
        if (elementClass === isPersistentAnimationStr) {
            return true;
        }
    }
    return false;
};

let lastAnimationTime = 0;
const MIN_TIME_BETWEEN_TRIGGER_ANIMATIONS_MS = 300;

export const initAnimations = (animationTriggerDecimal: number) => {
    // 1) build the animation descriptions array, which orders all elements by their y-position, then x-position on the page
    // This array contains the description ALL animations (since we don't want some types of animations to start later than others
    const animationDescriptions = getAnimationDescriptions();

    const animationQueue: AnimationDescription[] = [];
    const persistentAnimations = new Set<AnimationDescription>();
    const tryTriggerAnimations = () => {
        const currentTime = Date.now();
        if (currentTime - lastAnimationTime < MIN_TIME_BETWEEN_TRIGGER_ANIMATIONS_MS) {
            return;
        }
        lastAnimationTime = currentTime;
        triggerAnimations();
    };
    const triggerAnimations = () => {
        tryStartAnimation(
            animationDescriptions,
            animationQueue,
            persistentAnimations,
            animationTriggerDecimal
        );
        sendAnimationStateUpdateEvents(persistentAnimations);
        if (animationDescriptions.length === 0 && persistentAnimations.size === 0) {
            // All elements have been put into the animation queue. So remove handler to save computation
            window.removeEventListener("scroll", tryTriggerAnimations);
        }
    };

    // 2) register the scroll listener to determine if animations should render
    setTimeout(() => {
        tryTriggerAnimations();
    }, 100); // delay the initial animation by 100ms so the user first sees a blank page
    window.addEventListener("scroll", tryTriggerAnimations);

    return () => {
        window.removeEventListener("scroll", tryTriggerAnimations);
    };
};

const DEFAULT_ANIMATION_DELAY_MS = 100;
const animationDelayStr = "animation-delay-";
const getAnimationDelay = (element: HTMLElement): number => {
    for (const elementClass of element.classList) {
        if (elementClass.startsWith(animationDelayStr)) {
            return parseInt(elementClass.substring(animationDelayStr.length));
        }
    }
    return DEFAULT_ANIMATION_DELAY_MS;
};

const tryStartAnimation = (
    animationDescriptions: AnimationDescription[],
    animationQueue: AnimationDescription[],
    persistentAnimations: Set<AnimationDescription>,
    animationTriggerDecimal: number
) => {
    let isQueueOriginallyEmpty = animationQueue.length === 0;
    while (
        animationDescriptions.length > 0 &&
        isFirstElementInAnimationRange(animationDescriptions, animationTriggerDecimal)
    ) {
        const animationDescription = getNextAnimationDescription(
            animationDescriptions,
            persistentAnimations
        );
        if (animationDescription.elementTop() <= window.scrollY) {
            // animate immediately since the viewport is below this element's visibility
            animateElement(animationDescription);
        } else {
            // The user scrolled down enough for this element to "centered enough" on the user's screen.
            animationQueue.push(animationDescription);
        }
    }
    // the user's scrolling may have also made elements in the animationQueue to be above the viewport
    // so animate those elements immediately as well
    while (animationQueue.length > 0 && animationQueue[0].elementTop() <= window.scrollY) {
        animateElement(getNextAnimationDescription(animationQueue, persistentAnimations));
    }

    if (isQueueOriginallyEmpty) {
        // it means that we pushed new elements to the queue, and the handler will animate the element
        animateFirstItemInQueue(animationQueue);
    }
};

const getNextAnimationDescription = (
    animationDescriptions: AnimationDescription[],
    persistentAnimations: Set<AnimationDescription>
) => {
    const poppedAnimationDescription = animationDescriptions.shift()!; // shift pops off the first element and returns it
    if (poppedAnimationDescription.isPersistentAnimation) {
        // Add the element to the persistentAnimations set so
        // we can send the right animation state when the user scrolls
        persistentAnimations.add(poppedAnimationDescription);
    }
    return poppedAnimationDescription;
};

const isFirstElementInAnimationRange = (
    animationDescriptions: AnimationDescription[],
    animationTriggerDecimal: number
): boolean => {
    // this is used for debugging
    const moverElement = document.getElementById("mover");
    if (moverElement) {
        moverElement.style.top = animationDescriptions[0].elementTop().toString() + "px";
    }
    return (
        animationDescriptions[0].elementTop() <=
        window.scrollY + window.innerHeight * animationTriggerDecimal
    );
};

// pop off elements from the queue and add the final class every x seconds
const animateFirstItemInQueue = (animationQueue: AnimationDescription[]) => {
    if (animationQueue.length > 0) {
        setTimeout(() => {
            if (animationQueue.length > 0) {
                animateElement(animationQueue.shift()!); // shift pops off the first element and returns it
                animateFirstItemInQueue(animationQueue);
            }
        }, animationQueue[0].animationDelay);
    }
};

export const triggerAnimationImmediately = (element: HTMLElement, animationDef: AnimationDef) => {
    // we assume the element was never put into the animation queue
    const animationDesc = getAnimationDescription(element, animationDef);
    animateElement(animationDesc);
};

const animateElement = (animationDescription: AnimationDescription) => {
    const element = animationDescription.element;
    element.classList.add(animationDescription.animationDef.finalClass);
    element.dispatchEvent(newAnimationStateEvent(AnimationState.RUNNING));
};

const SCROLL_BUFFER = 10; // the number of pixels above and below the viewport to consider an animation as "running"
const sendAnimationStateUpdateEvents = (persistentAnimations: Set<AnimationDescription>) => {
    for (const animationDescription of persistentAnimations) {
        const animationState =
            window.scrollY - SCROLL_BUFFER <=
                animationDescription.elementTop() + animationDescription.element.offsetHeight &&
            animationDescription.elementTop() <= window.scrollY + window.innerHeight + SCROLL_BUFFER
                ? AnimationState.RUNNING
                : AnimationState.PAUSED;
        animationDescription.element.dispatchEvent(newAnimationStateEvent(animationState));
    }
};
