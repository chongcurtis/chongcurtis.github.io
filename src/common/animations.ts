type Animation = {
    initialClass: string;
    finalClass: string;
};

// these classes are defined in globals.css
const fadeInAnimation = {
    initialClass: "fade-in-on-scroll",
    finalClass: "faded-in",
};
const expandAnimation = {
    initialClass: "expand-on-scroll",
    finalClass: "expanded",
};

export const tryStartAnimations = () => {
    const noMoreFadeIns = tryStartAnimation(fadeInAnimation);
    const noMoreExpands = tryStartAnimation(expandAnimation);
    // DO NOT put join the two functions in this if statement with a && cause of early return, the later ones won't run
    if (noMoreFadeIns && noMoreExpands) {
        // All elements have faded in. So remove handler to save computation
        window.removeEventListener("scroll", tryStartAnimations);
    }
};

// returns a boolean, indicating that we are done starting all animations
const tryStartAnimation = (animation: Animation): boolean => {
    // I am using querySelectorAll since getElementsByClassName doesn't return all elements
    // Why? it's cause getElementsByClassName returns a live collection: https://stackoverflow.com/a/31311967/4647924
    const elements = document.querySelectorAll(`.${animation.initialClass}`);
    if (elements.length === 0) {
        return true;
    }

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i] as HTMLElement;
        const elementTop = element.offsetTop;
        if (elementTop <= window.scrollY + (window.innerHeight * 7) / 8) {
            element.classList.add(animation.finalClass);
            element.classList.remove(animation.initialClass);
        }
    }
    return false;
};
