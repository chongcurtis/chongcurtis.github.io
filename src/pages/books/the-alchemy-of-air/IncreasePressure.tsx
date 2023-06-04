import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import useAnimationEventListener from "@/common/useAnimationEventListener";

const BOX_COLOR = "white";
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
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();
    const pressureAlpha = React.useRef<number>(1);

    const spawnHotAtom = () => {
        const vx = Math.floor(Math.random() * 5) + 1;
        const vy = Math.floor(Math.random() * 5) + 1;

        particles.current.push(
            new Particle(
                100,
                250,
                100,
                vx,
                vy,
                0,
                0,
                1 / pressureAlpha.current + 1,
                "red",
                30 * pressureAlpha.current
            )
        );
        if (pressureAlpha.current > 0.5) {
            pressureAlpha.current -= 0.01;
        }

        const spawnDelay = 100 * Math.pow(pressureAlpha.current, 2);
        timeoutId.current = setTimeout(spawnHotAtom, spawnDelay);
    };

    useEffect(() => {
        if (startAnimationEventFired) {
            spawnHotAtom();
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
