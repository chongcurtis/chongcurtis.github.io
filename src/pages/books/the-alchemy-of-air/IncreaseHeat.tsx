import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import useAnimationEventListener from "@/common/useAnimationEventListener";
import { Queue } from "@/common/queue";

// make a box around the particles
// const boxColor = "#dedede";
const boxColor = "white";

const blocks = [
    new Block(250, 50, 200, 20, boxColor, 0),
    new Block(250, 150, 200, 20, boxColor, 0),
    new Block(200, 100, 20, 200, boxColor, 0),
    new Block(300, 100, 20, 200, boxColor, 0),
];

// this animation works by spawning two particles close to each other (but not touching) and sending them to the right
// in the middle of the canvas, there is a rotated square (at a 45 degree angle) that the particles will collide with, splitting them apart
export default function IncreaseHeat() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();
    const colorQueue = React.useRef<Queue<string>>(new Queue<string>());

    const spawnHotAtom = () => {
        const vx = Math.floor(Math.random() * 5) + 1;
        const vy = Math.floor(Math.random() * 5) + 1;

        particles.current.push(
            new Particle(100, 250, 100, vx, vy, 0, 0, 2, colorQueue.current.front()!, 100)
        );
        if (colorQueue.current.size() > 1) {
            colorQueue.current.dequeue();
        }

        const spawnDelay = 100;
        timeoutId.current = setTimeout(spawnHotAtom, spawnDelay);
    };

    useEffect(() => {
        if (startAnimationEventFired) {
            generateGradient(30);
            spawnHotAtom();
        }
        return () => {
            clearTimeout(timeoutId.current);
        };
    }, [startAnimationEventFired]);

    function generateGradient(steps: number) {
        // The colors represented in RGB format
        const colorStops = [
            { r: 0, g: 0, b: 255 }, // Blue
            { r: 173, g: 216, b: 230 }, // Light Blue
            { r: 255, g: 165, b: 0 }, // Orange
            { r: 255, g: 0, b: 0 }, // Red
        ];

        for (let i = 0; i < colorStops.length - 1; i++) {
            let startColor = colorStops[i];
            let endColor = colorStops[i + 1];

            for (let j = 0; j < steps; j++) {
                let r = startColor.r + ((endColor.r - startColor.r) * j) / steps;
                let g = startColor.g + ((endColor.g - startColor.g) * j) / steps;
                let b = startColor.b + ((endColor.b - startColor.b) * j) / steps;

                // Ensuring the color values stay within the valid range (0-255)
                r = Math.round(Math.max(Math.min(255, r), 0));
                g = Math.round(Math.max(Math.min(255, g), 0));
                b = Math.round(Math.max(Math.min(255, b), 0));

                colorQueue.current.enqueue(`rgb(${r},${g},${b})`);
            }
        }
    }

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
