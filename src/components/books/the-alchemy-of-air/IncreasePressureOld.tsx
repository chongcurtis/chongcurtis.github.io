import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/components/books/the-alchemy-of-air/Block";
import useAnimationEventListener from "@/common/useAnimationEventListener";
import cloneDeep from "lodash.clonedeep";
import { useStatefulRef } from "@/common/useStatefulRef";

const BOX_COLOR = "red";
const initialBlocks = [
    new Block(250, 50, 200, 20, BOX_COLOR, 0), // top
    new Block(250, 150, 200, 20, BOX_COLOR, 0), // bottom
    new Block(200, 100, 20, 200, BOX_COLOR, 0), // left
    new Block(300, 100, 20, 200, BOX_COLOR, 0), // right
];

// this animation works by spawning two particles close to each other (but not touching) and sending them to the right
// in the middle of the canvas, there is a rotated square (at a 45 degree angle) that the particles will collide with, splitting them apart
export default function IncreasePressureOld() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const blocks = useStatefulRef<Block[]>([]);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();

    const spawnParticle = () => {
        const vx = Math.floor(Math.random() * 3) + 1;
        const vy = Math.floor(Math.random() * 3) + 1;
        // blocks.current = blocks.current.map((block, idx) => {
        //     switch (idx) {
        //         case 0:
        //             block.changePosition(0, 1); // move the top block down
        //             break;
        //         case 1:
        //             block.changePosition(0, -1); // move the bottom block up
        //             break;
        //         case 2:
        //             block.changePosition(1, 0); // move the left block right
        //             break;
        //         case 3:
        //             block.changePosition(-1, 0); // move the right block left
        //             break;
        //     }
        //     return block;
        // });

        particles.current.push(
            new Particle(100, 250, 100, vx, vy, 0, 0, 2, "rgb(255, 165,0)", 100)
        );

        const spawnDelay = 100;
        timeoutId.current = setTimeout(spawnParticle, spawnDelay);
    };

    useEffect(() => {
        if (startAnimationEventFired) {
            blocks.current = cloneDeep(initialBlocks);
            spawnParticle();
        }
        return () => {
            clearTimeout(timeoutId.current);
        };
    }, [startAnimationEventFired]);

    return (
        <div ref={elementRef}>
            <ParticleSimulationCanvas
                animationState={startAnimationEventFired}
                particles={particles}
                blocks={blocks.current}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={true}
            />
        </div>
    );
}
