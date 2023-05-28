type Animation = {
    initialClass: string;
    inQueueClass: string; // has same style as initialClass, but is used to indicate that the element is in the queue, so we don't put it into another queue
    finalClass: string;
};

// these classes are defined in globals.css
const fadeInAnimation: Animation = {
    initialClass: "fade-in-on-scroll",
    inQueueClass: "in-fade-in-on-scroll-queue",
    finalClass: "faded-in",
};
const fadeInSlowAnimation: Animation = {
    initialClass: "fade-in-on-scroll-slow",
    inQueueClass: "in-fade-in-on-scroll-slow-queue",
    finalClass: "faded-in-slow",
};
const expandAnimation: Animation = {
    initialClass: "expand-on-scroll",
    inQueueClass: "in-expand-on-scroll-queue",
    finalClass: "expanded",
};
const underlineAnimation: Animation = {
    initialClass: "underline-on-scroll",
    inQueueClass: "in-underline-on-scroll-queue",
    finalClass: "underlined",
};

// used to trigger the start animation event on the canvas when it's in view
export const startAnimationEventName = "start-animation-event";
const newStartAnimationEvent = () => {
    return new Event(startAnimationEventName, {
        bubbles: true, // the event can bubble up through the DOM tree
        cancelable: true, // the event can be cancelled using preventDefault()
        composed: false, // the event does not propagate outside of the shadow DOM
    });
};

const setupAnimationHandler = (animation: Animation) => {
    const triggerAnimations = () => {
        const noMoreAnimations = tryStartAnimation(animation);
        if (noMoreAnimations) {
            // console.log("removed" + animation.initialClass);
            // All elements have faded in. So remove handler to save computation
            window.removeEventListener("scroll", triggerAnimations);
        }
    };
    // delay the initial animation by 100ms so the user first sees a blank page
    setTimeout(() => {
        triggerAnimations();
    }, 100);
    window.addEventListener("scroll", triggerAnimations);
    return () => {
        window.removeEventListener("scroll", triggerAnimations);
    };
};

export const initAnimations = () => {
    const cleanupFunctions = [
        setupAnimationHandler(fadeInAnimation),
        setupAnimationHandler(fadeInSlowAnimation),
        setupAnimationHandler(expandAnimation),
        setupAnimationHandler(underlineAnimation),
    ];
    return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
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

// const inAnimationQueue = "in-animation-queue";
// returns a boolean, indicating that we are done starting all animations
const tryStartAnimation = (animation: Animation): boolean => {
    // I am using querySelectorAll since getElementsByClassName doesn't return all elements
    // Why? it's cause getElementsByClassName returns a live collection: https://stackoverflow.com/a/31311967/4647924
    const elements = document.querySelectorAll(`.${animation.initialClass}`);
    if (elements.length === 0) {
        return true;
    }

    const animateQueue: [HTMLElement, number][] = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        // const elementTop = element.offsetTop;
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop <= window.scrollY) {
            console.log(element.innerText);
            console.log(elementTop, window.scrollY);
            // The element is off the screen, so fade them in immediately (don't put into queue)
            element.classList.add(animation.finalClass);
            element.classList.remove(animation.initialClass);
            element.dispatchEvent(newStartAnimationEvent());
        } else if (elementTop <= window.scrollY + (window.innerHeight * 6.5) / 8) {
            // These elements are on the viewport. So push them into the queue to do fancy animations
            const animationDelayMs = getAnimationDelay(element);
            animateQueue.push([element, animationDelayMs]);
            element.classList.add(animation.inQueueClass);
            element.classList.remove(animation.initialClass);
        }
    }

    // pop off elements from the queue and add the final class every x seconds
    const animateElement = () => {
        const res = animateQueue.shift(); // pop off the first element
        if (res) {
            const [element, animationDelay] = res;
            console.log(element.innerText, animationDelay);
            setTimeout(() => {
                element.classList.remove(animation.inQueueClass);
                element.classList.add(animation.finalClass);
                element.dispatchEvent(newStartAnimationEvent());
                animateElement();
            }, animationDelay);
        }
    };

    setTimeout(animateElement, DEFAULT_ANIMATION_DELAY_MS);

    return false;
};
