import React from "react";
import cloneDeep from "lodash.clonedeep";
import { startAnimationEventName } from "@/common/animations";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import FluidSimulationCanvas from "@/pages/books/the-alchemy-of-air/fluid-simulator/FluidSimulationCanvas";
import { Obstacle } from "@/pages/books/the-alchemy-of-air/fluid-simulator/Obstacle";
import { createZeroToOne } from "@/common/types/ZeroToOne";

const initialObstacles = [
    new Obstacle(createZeroToOne(0.5), createZeroToOne(0.5), createZeroToOne(0.1)),
];
export default function AlchemyOfAirTitle() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const [obstacles, setObstacles] = React.useState<Obstacle[]>([]);
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    // ref to the ParticleSimulationCanvas
    React.useEffect(() => {
        if (!canvasContainerRef.current) {
            return;
        }
        const title = canvasContainerRef.current;

        const startAnimation = () => {
            // the simulation canvas should already be running. so all we need to do is set the particles
            console.log("cloned");
            setObstacles(cloneDeep(initialObstacles));
        };

        title.addEventListener(startAnimationEventName, startAnimation);
        return () => {
            // cleanup
            title.removeEventListener(startAnimationEventName, startAnimation);
            clearTimeout(timeoutId.current);
        };
    }, [canvasContainerRef]);
    return (
        <>
            {/*<div className="align-center flex flex-col justify-center">*/}
            {/*<p className="px-5 text-center text-6xl font-thin">*/}
            {/*    <span className="fade-in-on-scroll">The</span>{" "}*/}
            {/*    <span className="fade-in-on-scroll">Alchemy</span>{" "}*/}
            {/*    <span className="fade-in-on-scroll">of</span>*/}
            {/*</p>*/}
            {/*<div*/}
            {/*    ref={titleRef}*/}
            {/*    className="align-center fade-in-on-scroll fade-in-on-scroll-slow animation-delay-400 ml-5 flex h-[500px] w-[500px] justify-center "*/}
            {/*>*/}
            <p className="fade-in-on-scroll absolute left-1/2 -translate-x-1/2 translate-y-[242px] transform text-6xl font-thin italic">
                Air
            </p>
            <div
                ref={canvasContainerRef}
                className="fade-in-on-scroll h-[350px] w-[350px] md:h-[500px] md:w-[500px]"
            >
                <FluidSimulationCanvas obstacles={obstacles} canvasWidth={500} canvasHeight={500} />
            </div>
            {/*</div>*/}
        </>
    );
}
