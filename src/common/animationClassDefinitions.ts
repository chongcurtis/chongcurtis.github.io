export type AnimationDef = {
    initialClass: string;
    finalClass: string;
    customAnimation?: (element: HTMLElement) => void;
};

// these classes are defined in globals.css
interface AnimationDefs {
    [animationName: string]: AnimationDef;
}

export const animationDefs: AnimationDefs = {
    fadeInAnimation: {
        initialClass: "fade-in-on-scroll",
        finalClass: "faded-in",
    },
    fadeInSlowAnimation: {
        initialClass: "fade-in-on-scroll-slow",
        finalClass: "faded-in-slow",
    },
    expandAnimation: {
        initialClass: "expand-on-scroll",
        finalClass: "expanded",
    },
    underlineAnimation: {
        initialClass: "underline-on-scroll",
        finalClass: "underlined",
    },
    drawStrokeAnimation: {
        initialClass: "draw-stroke-on-scroll",
        finalClass: "drew-stroke",
        customAnimation: (element: HTMLElement) => {
            const pathElements = element.querySelectorAll("path");

            // If a path element doesn't exist, return null
            if (pathElements.length === 0) {
                throw "Path element doesn't exist";
            }
            const pathElement = pathElements[0] as SVGPathElement;
            const pathLength = Math.floor(pathElement.getTotalLength());
            console.log("pathlength", pathLength);

            // Create a new stylesheet
            const styleSheet = document.createElement("style");
            document.head.appendChild(styleSheet);

            // Define your animation
            const animationName = `draw-stroke${pathLength}`;
            const keyframes = `
        0% { stroke-dashoffset: ${pathLength}; }
        100% { stroke-dashoffset: 0; }
      `;

            // Add the @keyframes rule to the stylesheet
            styleSheet!.sheet!.insertRule(
                `@keyframes ${animationName} {
        ${keyframes}
      }`,
                styleSheet!.sheet!.cssRules.length
            );

            // Apply styles
            pathElement.style.strokeDasharray = pathLength.toString();
            pathElement.style.animation = `2s ${animationName} cubic-bezier(0.9, 0, 0.5, 1) forwards`;
        },
    },
};
