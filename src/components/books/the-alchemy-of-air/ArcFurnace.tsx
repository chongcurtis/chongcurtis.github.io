import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/components/books/the-alchemy-of-air/Block";
import useAnimationStateEventListener from "@/common/useAnimationEventListener";
import { AnimationState } from "@/common/animations";

const BOX_COLOR = "#616161";
// const BOX_COLOR = "#dedede";
const blocks = [
    new Block(75, 100, 150, 3, BOX_COLOR, 0), // left bar
    new Block(425, 100, 150, 3, BOX_COLOR, 0), // right bar
    new Block(150, 100, 10, 100, BOX_COLOR, 0), // left plate
    new Block(350, 100, 10, 100, BOX_COLOR, 0), // right plate
];

// this animation works by spawning two particles close to each other (but not touching) and sending them to the right
// in the middle of the canvas, there is a rotated square (at a 45 degree angle) that the particles will collide with, splitting them apart
export default function ArcFurnace() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, animationState, hasStartEventFired] = useAnimationStateEventListener();
    const animationStateRef = React.useRef(AnimationState.BEFORE_START);

    const spawnHotAtom = (x: number, y: number, vxDirection: number) => {
        if (animationStateRef.current === AnimationState.PAUSED) {
            clearTimeout(timeoutId.current);
            return;
        }
        const vx = vxDirection * (Math.random() * 2 + 1);
        const vy = Math.random() - 0.5;

        particles.current.push(new Particle(100, x, y, vx, vy, 0, 0, 1, "#48e7f0", 45));
        const spawnDelay = 200;
        timeoutId.current = setTimeout(() => spawnHotAtom(x, y, vxDirection), spawnDelay);
    };

    useEffect(() => {
        animationStateRef.current = animationState;
        if (animationState === AnimationState.RUNNING) {
            clearTimeout(timeoutId.current);
            spawnHotAtom(160, 100, 1);
            spawnHotAtom(340, 100, -1);
        }
    }, [animationState]);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId.current);
        };
    }, [hasStartEventFired]);

    return (
        <div className="dummy-animation is-persistent-animation " ref={elementRef}>
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
