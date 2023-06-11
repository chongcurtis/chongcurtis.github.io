import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { NITROGEN_COLOR } from "@/pages/books/the-alchemy-of-air/constants";
import useAnimationEventListener from "@/common/useAnimationEventListener";

export default function CultivateAllArableLand() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();

    const spawnFieldColumn = () => {};

    const spawnNitrogenPair = () => {
        particles.current.push(new Particle(100, 0, 95, 3, 0, 0, 0, 5, NITROGEN_COLOR, 200));
        particles.current.push(new Particle(100, 0, 105, 3, 0, 0, 0, 5, NITROGEN_COLOR, 200));

        const spawnDelay = 1000;
        timeoutId.current = setTimeout(spawnNitrogenPair, spawnDelay);
    };

    useEffect(() => {
        if (startAnimationEventFired) {
            spawnNitrogenPair();
        }
        return () => {
            clearTimeout(timeoutId.current);
        };
    }, [startAnimationEventFired]);

    return (
        <div ref={elementRef}>
            <ParticleSimulationCanvas
                startAnimation={startAnimationEventFired}
                particles={particles}
                blocks={blocks}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={true}
            />
        </div>
    );
}
