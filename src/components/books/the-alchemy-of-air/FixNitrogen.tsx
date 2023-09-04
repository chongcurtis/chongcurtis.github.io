import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/components/books/the-alchemy-of-air/Block";
import { BACKGROUND_COLOR, NITROGEN_COLOR } from "@/components/books/the-alchemy-of-air/constants";
import useAnimationStateEventListener from "@/common/useAnimationEventListener";
import { AnimationState } from "@/common/animations";

const blocks = [new Block(250, 100, 10, 10, BACKGROUND_COLOR, 45)];

// this animation works by spawning two particles close to each other (but not touching) and sending them to the right
// in the middle of the canvas, there is a rotated square (at a 45 degree angle) that the particles will collide with, splitting them apart
export default function FixNitrogen() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, animationState, hasStartEventFired] = useAnimationStateEventListener();
    const animationStateRef = React.useRef(AnimationState.BEFORE_START);

    const spawnNitrogenPair = () => {
        if (animationStateRef.current === AnimationState.PAUSED) {
            clearTimeout(timeoutId.current);
            return;
        }
        particles.current.push(new Particle(100, 0, 95, 3.4, 0, 0, 0, 5, NITROGEN_COLOR, 200));
        particles.current.push(new Particle(100, 0, 105, 3.4, 0, 0, 0, 5, NITROGEN_COLOR, 200));

        const spawnDelay = 1000;
        timeoutId.current = setTimeout(spawnNitrogenPair, spawnDelay);
    };
    useEffect(() => {
        animationStateRef.current = animationState;
        if (animationState === AnimationState.RUNNING) {
            clearTimeout(timeoutId.current);
            spawnNitrogenPair();
        }
    }, [animationState]);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId.current);
        };
    }, [hasStartEventFired]);

    return (
        <div
            className="dummy-animation is-persistent-animation flex flex-col items-center justify-center"
            ref={elementRef}
        >
            <ParticleSimulationCanvas
                animationState={animationState}
                particles={particles}
                blocks={blocks}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={true}
            />
        </div>
    );
}
