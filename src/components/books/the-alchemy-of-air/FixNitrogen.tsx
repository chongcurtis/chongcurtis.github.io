import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/components/books/the-alchemy-of-air/Block";
import { BACKGROUND_COLOR, NITROGEN_COLOR } from "@/components/books/the-alchemy-of-air/constants";
import useAnimationEventListener from "@/common/useAnimationEventListener";

const blocks = [new Block(250, 100, 10, 10, BACKGROUND_COLOR, 45)];

// this animation works by spawning two particles close to each other (but not touching) and sending them to the right
// in the middle of the canvas, there is a rotated square (at a 45 degree angle) that the particles will collide with, splitting them apart
export default function FixNitrogen() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();

    const spawnNitrogenPair = () => {
        particles.current.push(new Particle(100, 0, 95, 9, 0, 0, 0, 5, NITROGEN_COLOR, 200));
        particles.current.push(new Particle(100, 0, 105, 9, 0, 0, 0, 5, NITROGEN_COLOR, 200));

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
        <div className="flex flex-col items-center justify-center" ref={elementRef}>
            <ParticleSimulationCanvas
                animationState={startAnimationEventFired}
                particles={particles}
                blocks={blocks}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={true}
            />
        </div>
    );
}
