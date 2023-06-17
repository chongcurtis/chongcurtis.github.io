import { Animation, animationDefinitions } from "@/common/animationClassDefinitions";

// used to trigger the start animation event on the canvas when it's in view
export const startAnimationEventName = "start-animation-event";
export const NARRATIVE_ANIMATION_TRIGGER_DECIMAL = 0.9; // at around 0.5 of the screen height, the animation should start
export const NORMAL_ANIMATION_TRIGGER_DECIMAL = 0.9;
const newStartAnimationEvent = () => {
    return new Event(startAnimationEventName, {
        bubbles: true, // the event can bubble up through the DOM tree
        cancelable: true, // the event can be cancelled using preventDefault()
        composed: false, // the event does not propagate outside of the shadow DOM
    });
};

interface AnimationDescription {
    element: HTMLElement;
    elementTop: number;
    animationDefinition: Animation;
    animationDelay: number;
    text: string; // for debugging purposes
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
                elementTop:
                    element.getBoundingClientRect().top + document.documentElement.scrollTop,
                animationDefinition,
                animationDelay: getAnimationDelay(element),
            });
        }
    }

    // 2) sort by y-position, then x-position
    animationDescriptions.sort((animationDefinition1, animationDefinition2) => {
        const y1 = animationDefinition1.elementTop;
        const y2 = animationDefinition2.elementTop;

        if (y1 !== y2) {
            return y1 - y2;
        }

        const x1 = animationDefinition1.element.getBoundingClientRect().left;
        const x2 = animationDefinition2.element.getBoundingClientRect().left;
        return x1 - x2;
    });
    return animationDescriptions;
};

export const initAnimations = (animationTriggerDecimal: number) => {
    // 1) build the animation descriptions array, which orders all elements by their y-position, then x-position on the page
    // This array contains the description ALL animations (since we don't want some types of animations to start later than others
    const animationDescriptions = getAnimationDescriptions();

    const animationQueue: AnimationDescription[] = [];
    const triggerAnimations = () => {
        tryStartAnimation(animationDescriptions, animationQueue, animationTriggerDecimal);
        if (animationDescriptions.length == 0) {
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
    animationTriggerDecimal: number
) => {
    let isQueueOriginallyEmpty = animationQueue.length === 0;
    while (
        animationDescriptions.length > 0 &&
        isFirstElementInAnimationRange(animationDescriptions, animationTriggerDecimal)
    ) {
        const animationDescription = animationDescriptions.shift()!; // pops off the first element and returns it
        if (animationDescription.elementTop <= window.scrollY) {
            // animate immediately since the viewport is below this element's visibility
            animateElement(animationDescription);
        } else {
            // The user scrolled down enough for this element to "centered enough" on the user's screen.
            animationQueue.push(animationDescription);
        }
    }
    // the user's scrolling may have also made elements in the animationQueue to be above the viewport
    // so animate those elements immediately as well
    while (
        animationQueue.length > 0 &&
        animationQueue[0].elementTop <=
            window.scrollY + window.innerHeight * animationTriggerDecimal
    ) {
        animateElement(animationQueue.shift()!); // shift pops off the first element and returns it
    }

    if (isQueueOriginallyEmpty) {
        // it means that we pushed new elements to the queue, and the handler will animate the element
        animateFirstItemInQueue(animationQueue);
    }
};

const isFirstElementInAnimationRange = (
    animationDescriptions: AnimationDescription[],
    animationTriggerDecimal: number
): boolean => {
    return (
        animationDescriptions[0].elementTop <=
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
    element.dispatchEvent(newStartAnimationEvent());
};
