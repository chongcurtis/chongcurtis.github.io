import React from "react";
import { initAnimations } from "@/common/animations";
import NBodySimulationCanvas from "@/pages/books/the-dark-forest/NBodySimulationCanvas";
import { BinaryStarSystem, ManyBodySystem } from "@/pages/books/the-dark-forest/NBodySystems";

export default function TheDarkForest() {
    React.useEffect(() => {
        return initAnimations();
    }, []);

    return (
        <>
            <p className="fade-in-on-scroll relative mt-60 text-4xl">Spoiler Alert!</p>
            <p className="fade-in-on-scroll relative mt-4 text-center text-xl">
                I spoil the second book in the Three Body Problem series
            </p>
            <p className="text-md fade-in-on-scroll relative mt-4 text-center text-lg">
                Note: You can read The Dark Forest without reading the previous book because it's
                about completely new characters
                {/*first But if you'll learn why it's the best sci fi book of all time.
                {/*further, if plan on reading the Three Body Problem series, you should probably stop*/}
                {/*because I spoil the second book. You can read the second book without reading the*/}
                {/*first because no characters carry over from the first book. And if you want a sneak*/}
                {/*peak? Well, scroll down and you'll learn why it's the best sci fi book of all time.*/}
            </p>
            <div className="relative mt-60"></div>
            {/*<div className="top-100 absolute text-4xl">*/}
            <div className="text-4xl">
                <p className="fade-in-on-scroll">The Dark Forest</p>
            </div>
            <p className="fade-in-on-scroll mt-4">The war is lost.</p>
            <p className="fade-in-on-scroll mt-4">It has been for 50 years.</p>
            <div className="h-[500px] w-[500px]">
                <NBodySimulationCanvas
                    bodies={ManyBodySystem}
                    canvasWidth={500}
                    canvasHeight={500}
                />
            </div>
            <p className="fade-in-on-scrollmt-4">What can you do if there's an enemy that can</p>
            <p className="fade-in-on-scroll mt-20 w-full">Hear your every conversation</p>

            <div className="h-[500px] w-[500px]">
                <NBodySimulationCanvas
                    bodies={BinaryStarSystem}
                    canvasWidth={500}
                    canvasHeight={500}
                />
            </div>

            <p className="fade-in-on-scroll mt-4">And stop your technological progress</p>
            <p className="fade-in-on-scroll mt-4">Entrusted with the future of humanity</p>
            <p className="fade-in-on-scroll mt-4">
                Is a <span className="underline-on-scroll">hedonist</span>
            </p>
            <div className="mb-[500px]" />
        </>
    );
}
