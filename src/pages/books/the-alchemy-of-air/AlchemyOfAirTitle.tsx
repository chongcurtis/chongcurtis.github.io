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
    const titleRef = React.useRef<HTMLDivElement>(null);
    // ref to the ParticleSimulationCanvas
    React.useEffect(() => {
        if (!titleRef.current) {
            return;
        }
        const title = titleRef.current;

        const startAnimation = () => {
            // the simulation canvas should already be running. so all we need to do is set the particles
            setObstacles(cloneDeep(initialObstacles));
        };

        title.addEventListener(startAnimationEventName, startAnimation);
        return () => {
            // cleanup
            title.removeEventListener(startAnimationEventName, startAnimation);
            clearTimeout(timeoutId.current);
        };
    }, [titleRef]);
    return (
        <div className="align-center flex h-[500px] w-[500px] flex-col justify-center">
            <p className="text-center text-6xl">
                <span className="fade-in-on-scroll">The</span>{" "}
                <span className="fade-in-on-scroll">Alchemy</span>{" "}
                <span className="fade-in-on-scroll">of</span>
            </p>
            <div
                ref={titleRef}
                className="align-center fade-in-on-scroll ml-5 flex h-[500px] w-[500px] justify-center "
            >
                <p className="absolute left-1/2 -translate-x-1/2 translate-y-[242px] transform text-6xl font-thin">
                    Air
                </p>
                <FluidSimulationCanvas obstacles={obstacles} canvasWidth={500} canvasHeight={500} />
            </div>
        </div>
    );
}
