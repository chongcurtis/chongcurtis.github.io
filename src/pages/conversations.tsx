import React from "react";
import { initAnimations, NORMAL_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";

export default function Dreams() {
    const prevAnimation = React.useRef(null);
    React.useEffect(() => {
        return initAnimations(NORMAL_ANIMATION_TRIGGER_DECIMAL, prevAnimation);
    }, []);

    return (
        // NOTE: <> must be used since styles are applied in a parent div
        <>
            <div className="pl-10 pr-5">
                <p>random converstaions I've had and thought were funny</p>
                <p>I'm going to die with a 0/1/0 score</p>
            </div>
        </>
    );
}
