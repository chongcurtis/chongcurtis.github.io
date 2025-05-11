import React from "react";
import { initAnimations, NORMAL_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";
import ThinLine from "@/components/ui/ThinLine";

export default function Passion() {
    const prevAnimation = React.useRef(null);
    React.useEffect(() => {
        return initAnimations(NORMAL_ANIMATION_TRIGGER_DECIMAL, prevAnimation);
    }, []);

    return (
        // NOTE: <> must be used since styles are applied in a parent div
        <>
            <div className="mt-20"></div>
            <h1 className="fade-in-on-scroll text-center text-xl">Finding Passion</h1>
            <p className="fade-in-on-scroll mb-4 mt-4 px-4">
            </p>
            <ThinLine animateImmediately={true} />

            <div className="h-80" />
        </>
    );
}
