import React, { useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";
import FluidSimulationCanvas from "@/pages/books/the-alchemy-of-air/fluid-simulator/FluidSimulationCanvas";
import { Obstacle } from "@/pages/books/the-alchemy-of-air/fluid-simulator/Obstacle";
import { createZeroToOne } from "@/common/types/ZeroToOne";
import useAnimationEventListener from "@/common/useAnimationEventListener";

const initialObstacles = [
    new Obstacle(createZeroToOne(0.5), createZeroToOne(0.5), createZeroToOne(0.1)),
];
export default function AlchemyOfAirTitle() {
    const [obstacles, setObstacles] = React.useState<Obstacle[]>([]);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();
    const [startFluidFlow, setStartFluidFlow] = useState(false);

    useEffect(() => {
        if (startAnimationEventFired) {
            setObstacles(cloneDeep(initialObstacles));

            // the simulation canvas should already be running. so all we need to do is set the particles
            // 2s for the "Air" to appear
            setTimeout(() => {
                setStartFluidFlow(true);
            }, 2000);
        }
    }, [startAnimationEventFired]);

    // TODO: consider drawing an image of sir william crookes using a bezier curve (and increasing time t for the polynomials decribing the x/y points)
    // maybe use this to draw the path https://stackoverflow.com/questions/13612942/how-to-animate-an-image-along-a-path-with-bezier-curves
    // I used this to convert to svg https://express.adobe.com/tools/convert-to-svg/#, but it doesn't have the lines
    // I need to use an image contour finding tool
    return (
        <div className="flex flex-col items-center justify-center">
            {/*<div className="align-center flex flex-col justify-center">*/}
            {/*<p className="translate-y-[100px] px-5 text-center text-4xl font-thin md:text-6xl">*/}
            {/*This parent div MUST be relative so the p tag holding "Air" will e properly centered within it*/}
            <p className="translate-y-[8rem] text-center text-4xl font-thin md:text-6xl">
                <span className="fade-in-on-scroll animation-delay-200">The</span>{" "}
                <span className="fade-in-on-scroll animation-delay-200">Alchemy</span>{" "}
                <span className="fade-in-on-scroll animation-delay-200">of</span>
            </p>
            <div
                ref={elementRef}
                className="relative h-[300px] w-[350px] md:h-[400px] md:w-[500px]"
            >
                <p className="fade-in-on-scroll-slow absolute left-1/2 top-1/2 -translate-x-[90%] -translate-y-[20%] transform text-4xl font-thin italic md:text-6xl">
                    {/*<p className="fade-in-on-scroll absolute left-0 right-0 m-auto text-4xl font-thin italic md:text-6xl">*/}
                    Air
                </p>
                <FluidSimulationCanvas
                    startAnimation={startFluidFlow}
                    obstacles={obstacles}
                    canvasWidth={1000}
                    canvasHeight={1000}
                />
            </div>
        </div>
    );
}
