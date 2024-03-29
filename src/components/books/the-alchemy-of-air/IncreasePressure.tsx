import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/components/books/the-alchemy-of-air/Block";
import useAnimationStateEventListener from "@/common/useAnimationEventListener";
import { BACKGROUND_COLOR } from "./constants";
import { AnimationState } from "@/common/animations";

const BOX_COLOR = BACKGROUND_COLOR;
// const BOX_COLOR = "#dedede";
const blocks = [
    new Block(250, 50, 200, 70, BOX_COLOR, 0),
    new Block(250, 150, 200, 70, BOX_COLOR, 0),
    new Block(200, 100, 70, 200, BOX_COLOR, 0),
    new Block(300, 100, 70, 200, BOX_COLOR, 0),
];

// this animation works by spawning two particles close to each other (but not touching) and sending them to the right
// in the middle of the canvas, there is a rotated square (at a 45 degree angle) that the particles will collide with, splitting them apart
export default function IncreasePressure() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, animationState, hasStartEventFired] = useAnimationStateEventListener();
    const animationStateRef = React.useRef(AnimationState.BEFORE_START);
    const pressureAlpha = React.useRef<number>(2); // affects the particle's radius

    const spawnHotAtom = () => {
        if (animationStateRef.current === AnimationState.PAUSED) {
            clearTimeout(timeoutId.current);
            return;
        }
        const vx = Math.random() * 4 - 2;
        const vy = Math.random() * 4 - 2;

        particles.current.push(
            new Particle(
                100,
                250,
                100,
                vx,
                vy,
                0,
                0,
                2 / pressureAlpha.current + 0.2,
                "red",
                40 * pressureAlpha.current
            )
        );
        if (pressureAlpha.current > 0.6) {
            pressureAlpha.current -= 0.05;
        }

        const spawnDelay = 50 * Math.pow(pressureAlpha.current, 2);
        timeoutId.current = setTimeout(spawnHotAtom, spawnDelay);
    };

    useEffect(() => {
        animationStateRef.current = animationState;
        if (animationState === AnimationState.RUNNING) {
            clearTimeout(timeoutId.current);
            spawnHotAtom();
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
