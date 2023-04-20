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
const expandAnimation: Animation = {
    initialClass: "expand-on-scroll",
    inQueueClass: "in-expand-on-scroll-queue",
    finalClass: "expanded",
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
    // delay the iniital animation by 100ms so the user first sees a blank page
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
        setupAnimationHandler(expandAnimation),
    ];
    return () => {
        cleanupFunctions.forEach((cleanup) => cleanup());
    };
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

    const animateQueue: HTMLElement[] = [];
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        const elementTop = element.offsetTop;
        if (elementTop <= window.scrollY) {
            // The element is off the screen, so fade them in immediately (don't put into queue)
            element.classList.add(animation.finalClass);
            element.classList.remove(animation.initialClass);
            element.dispatchEvent(newStartAnimationEvent());
        } else if (elementTop <= window.scrollY + (window.innerHeight * 7) / 8) {
            // These elements are on the viewport. So push them into the queue to do fancy animations
            animateQueue.push(element);
            element.classList.add(animation.inQueueClass);
            element.classList.remove(animation.initialClass);
        }
    }
    // pop off elements from the queue and add the final class every x seconds
    const interval = setInterval(() => {
        const element = animateQueue.shift(); // pop off the first element
        if (element) {
            element.classList.remove(animation.inQueueClass);
            element.classList.add(animation.finalClass);
            element.dispatchEvent(newStartAnimationEvent());
        } else {
            // we are done with the animations
            clearInterval(interval);
        }
    }, 100);
    return false;
};
