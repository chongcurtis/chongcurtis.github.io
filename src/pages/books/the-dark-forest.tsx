import NBodyCanvas from "@/pages/books/the-dark-forest/NBodyCanvas";
import { ThreeBodySystem } from "@/pages/books/the-dark-forest/NBodySystems";
import React from "react";
import { tryStartAnimations } from "@/common/animations";

export default function TheDarkForest() {
    React.useEffect(() => {
        setTimeout(tryStartAnimations, 100);
        window.addEventListener("scroll", tryStartAnimations);
        return () => {
            window.removeEventListener("scroll", tryStartAnimations);
        };
    }, []);

    return (
        <>
            <div className="relative mt-40"></div>
            {/*<div className="top-100 absolute text-4xl">*/}
            <div className="text-4xl">
                <p className="fade-in-on-scroll">The Dark Forest</p>
            </div>
            <div className="h-[500px] w-[500px]">
                <NBodyCanvas bodies={ThreeBodySystem} canvasWidth={500} canvasHeight={500} />
            </div>
            <p className="fade-in-on-scroll">
                Lastly I will say this: The book makes an implicitly strong assumption. That all
                civilizations are concerned with survival. Because all their actions serve this
                instinct.
            </p>
        </>
    );
}
