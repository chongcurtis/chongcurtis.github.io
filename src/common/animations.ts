import { Animation, animationDefinitions } from "@/common/animationClassDefinitions";

// used to trigger the start animation event on the canvas when it's in view
export const ANIMATION_STATE_EVENT_NAME = "animation-state-event";
export const NARRATIVE_ANIMATION_TRIGGER_DECIMAL = 0.7; // at around 0.7 of the screen height, the animation should start
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
    animationDefinition: Animation;
    animationDelay: number;
    text: string; // for debugging purposes
    isPersistentAnimation: boolean; // these are typically canvas elements that run forever. We should pause them when they scroll off-screen
}

const getAnimationDescriptions = (): AnimationDescription[] => {
    const animationDefinitionList: Animation[] = Array.from(Object.values(animationDefinitions));

    // 1) get all elements
    const animationDescriptions: AnimationDescription[] = [];
    for (const animationDefinition of animationDefinitionList) {
        // I am using querySelectorAll since getElementsByClassName doesn't return all elements
        // Why? it's cause getElementsByClassName returns a live collection: https://stackoverflow.com/a/31311967/4647924
        const elements = document.querySelectorAll(`.${animationDefinition.initialClass}`);
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            animationDescriptions.push({
                text: element.innerText,
                element,
                elementTop: () =>
                    element.getBoundingClientRect().top + document.documentElement.scrollTop,
                animationDefinition,
                animationDelay: getAnimationDelay(element),
                isPersistentAnimation: isPersistentAnimation(element),
            });
        }
    }

    // 2) sort by y-position, then x-position
    animationDescriptions.sort((animationDefinition1, animationDefinition2) => {
        const y1 = animationDefinition1.elementTop();
        const y2 = animationDefinition2.elementTop();

        if (y1 !== y2) {
            return y1 - y2;
        }

        const x1 = animationDefinition1.element.getBoundingClientRect().left;
        const x2 = animationDefinition2.element.getBoundingClientRect().left;
        return x1 - x2;
    });
    return animationDescriptions;
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

export const initAnimations = (animationTriggerDecimal: number) => {
    // 1) build the animation descriptions array, which orders all elements by their y-position, then x-position on the page
    // This array contains the description ALL animations (since we don't want some types of animations to start later than others
    const animationDescriptions = getAnimationDescriptions();

    const animationQueue: AnimationDescription[] = [];
    const persistentAnimations = new Set<AnimationDescription>();
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
            window.removeEventListener("scroll", triggerAnimations);
        }
    };

    // 2) register the scroll listener to determine if animations should render
    setTimeout(() => {
        triggerAnimations();
    }, 100); // delay the initial animation by 100ms so the user first sees a blank page
    window.addEventListener("scroll", triggerAnimations);

    return () => {
        window.removeEventListener("scroll", triggerAnimations);
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

// pop off elements from the queue and add the final class every x seconds
const animateElement = (animationDescription: AnimationDescription) => {
    const element = animationDescription.element;
    element.classList.add(animationDescription.animationDefinition.finalClass);
    element.dispatchEvent(newAnimationStateEvent(AnimationState.RUNNING));
};

const sendAnimationStateUpdateEvents = (persistentAnimations: Set<AnimationDescription>) => {
    const SCROLL_BUFFER = 10;
    for (const animationDescription of persistentAnimations) {
        const animationState =
            window.scrollY - SCROLL_BUFFER <=
                animationDescription.elementTop() + animationDescription.element.offsetHeight &&
            animationDescription.elementTop() <= window.scrollY + window.innerHeight + SCROLL_BUFFER
                ? AnimationState.RUNNING
                : AnimationState.PAUSED;
        console.log("sent animation state", animationState);
        animationDescription.element.dispatchEvent(newAnimationStateEvent(animationState));
    }
};
