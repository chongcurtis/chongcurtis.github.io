import React from "react";
import cloneDeep from "lodash.clonedeep";
import { startAnimationEventName } from "@/common/animations";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import FluidSimulationCanvas from "@/pages/books/the-alchemy-of-air/fluid-simulator/FluidSimulationCanvas";

const titleBlock = [new Block(-250, 70, 500, 10, "black", 110)];

export default function AlchemyOfAirTitle() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const blocks = React.useRef(null);
    const titleRef = React.useRef<HTMLDivElement>(null);
    // ref to the ParticleSimulationCanvas
    React.useEffect(() => {
        if (!titleRef.current) {
            return;
        }
        const title = titleRef.current;

        const startAnimation = () => {
            // the simulation canvas should already be running. so all we need to do is set the particles
            blocks.current = cloneDeep(titleBlock);
        };

        title.addEventListener(startAnimationEventName, startAnimation);
        return () => {
            // cleanup
            title.removeEventListener(startAnimationEventName, startAnimation);
            clearTimeout(timeoutId.current);
        };
    }, [titleRef]);
    return (
        <div ref={titleRef}>
            <FluidSimulationCanvas blocks={blocks} canvasWidth={500} canvasHeight={500} />
        </div>
    );
}
