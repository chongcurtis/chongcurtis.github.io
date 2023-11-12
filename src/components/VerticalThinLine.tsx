import { animationDefs } from "@/common/animationClassDefinitions";
import { triggerAnimationImmediately } from "@/common/animations";
import classNames from "classnames";
import { useEffect, useRef } from "react";

interface Props {
    animateImmediately?: boolean;
}
export default function VerticalThinLine({ animateImmediately }: Props) {
    const elementRef = useRef<HTMLHRElement>(null);
    useEffect(() => {
        if (animateImmediately && elementRef.current) {
            triggerAnimationImmediately(
                elementRef.current,
                animationDefs.expandVerticallyAnimation
            );
        }
    }, [elementRef.current]);

    const classes = classNames(
        "border-0 bg-gradient-to-t from-transparent via-black to-transparent my-auto mx-5",
        {
            "expand-vertically-on-scroll": !animateImmediately,

            // These are the initial css classes for expand-vertically-on-scroll. We need to manually set
            // them since we don't want to give this element the expand-on-scroll class
            // (so it doesn't get put into the animation queue)
            "h-1 transition-height duration-2000 ease-in": animateImmediately,
        }
    );

    const line = (
        <hr
            ref={elementRef}
            className={classes}
            style={{
                width: 1,
            }}
        />
    );
    return line;
}
