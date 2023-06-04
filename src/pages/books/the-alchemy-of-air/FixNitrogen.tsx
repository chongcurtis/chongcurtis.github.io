import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import { NITROGEN_COLOR } from "@/pages/books/the-alchemy-of-air/constants";
import useAnimationEventListener from "@/common/useAnimationEventListener";

const blocks = [new Block(250, 100, 1, 1, "white", 45)];

// this animation works by spawning two particles close to each other (but not touching) and sending them to the right
// in the middle of the canvas, there is a rotated square (at a 45 degree angle) that the particles will collide with, splitting them apart
export default function FixNitrogen() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();

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
