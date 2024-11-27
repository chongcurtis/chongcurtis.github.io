import { animationDefs } from "@/common/animationClassDefinitions";
import { triggerAnimationImmediately } from "@/common/animations";
import classNames from "classnames";
import { useEffect, useRef } from "react";

interface Props {
    animateImmediately?: boolean;
    additionalClasses?: string;
}
export default function ThinLine({ animateImmediately, additionalClasses }: Props) {
    const elementRef = useRef<HTMLHRElement>(null);
    useEffect(() => {
        if (animateImmediately && elementRef.current) {
            triggerAnimationImmediately(elementRef.current, animationDefs.expandAnimation);
        }
    }, [elementRef.current]);

    const classes = classNames(
        "border-0 bg-gradient-to-r from-transparent via-black to-transparent mx-auto my-5",
        additionalClasses,
        {
            "expand-on-scroll": !animateImmediately,

            // These are the initial css classes for expand-on-scroll. We need to manually set
            // them since we don't want to give this element the expand-on-scroll class
            // (so it doesn't get put into the animation queue)
            "w-1 transition-width duration-2000 ease-in": animateImmediately,
        }
    );

    const line = (
        <hr
            ref={elementRef}
            className={classes}
            style={{
                height: 1,
            }}
        />
    );
    return line;
}
