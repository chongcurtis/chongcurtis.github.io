import { animationDefs } from "@/common/animationClassDefinitions";
import { triggerAnimationImmediately } from "@/common/animations";
import classNames from "classnames";
import { useEffect, useRef } from "react";

interface Props {
    animateImmediatly?: boolean;
}
export default function ThinLine({ animateImmediatly }: Props) {
    const elementRef = useRef<HTMLHRElement>(null);
    useEffect(() => {
        if (animateImmediatly && elementRef.current) {
            triggerAnimationImmediately(elementRef.current, animationDefs.expandAnimation);
        }
    }, [elementRef.current]);

    const classes = classNames(
        "expand-on-scroll border-0 bg-gradient-to-r from-transparent via-black to-transparent mx-auto my-5",
        {
            "expand-on-scroll": animateImmediatly,
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
