import React from "react";
import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import cloneDeep from "lodash.clonedeep";
import { startAnimationEventName } from "@/common/animations";

export default function ExponentialCount() {
    React.useEffect(() => {
        const startAnimation = () => {
            setObstacles(cloneDeep(initialObstacles));

            // the simulation canvas should already be running. so all we need to do is set the particles
            // 2s for the "Air" to appear
            setTimeout(() => {
                setStartAnimation(true);
            }, 2000);
        };

        title.addEventListener(startAnimationEventName, startAnimation);
        return () => {
            // cleanup
            title.removeEventListener(startAnimationEventName, startAnimation);
            clearTimeout(timeoutId.current);
        };
    }, []);

    return (
        <div className="h-[350px] w-[350px] md:h-[500px] md:w-[500px]">
            0
        </div>
    );
}
