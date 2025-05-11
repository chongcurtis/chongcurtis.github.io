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
            <h1 className="fade-in-on-scroll text-center text-xl">Passion Projects</h1>
            <p className="fade-in-on-scroll mb-4 mt-4 px-4">
                The ones I've always wanted to make... and finally found the time to make them come
                true
            </p>
            <ThinLine animateImmediately={true} />
            <div className="mt-4 px-4">
                <div>
                    <p className="fade-in-on-scroll">
                        <span className="">Grammarly for anything:</span>{" "}
                        <a
                            href="https://checklet.page"
                            target="_blank"
                            className="ml-2 underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                        >
                            checklet.page
                        </a>
                    </p>
                </div>
                <div>
                    <p className="fade-in-on-scroll">
                        {" "}
                        <span className="">
                            Winning techniques used in winning Kaggle solutions:
                        </span>
                        <a
                            href="https://kaggle.curtischong.me"
                            target="_blank"
                            className="ml-2 underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                        >
                            kaggle.curtischong.me
                        </a>
                    </p>
                </div>
            </div>

            <div className="h-80" />
        </>
    );
}
