import React from "react";
import { initAnimations, NORMAL_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";

export default function ThingsImEmbarrassedAbout() {
    React.useEffect(() => {
        return initAnimations(NORMAL_ANIMATION_TRIGGER_DECIMAL);
    }, []);

    return (
        // NOTE: <> must be used since styles are applied in a parent div
        <>
            <div className="pl-10 pr-5">
                <p>pulling the fire alarm in the first grade because it told me to "pull here"</p>
                <p>Any recording of myself, especially the ones on YouTube</p>
            </div>
        </>
    );
}
