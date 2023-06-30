import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import React from "react";
import { startAnimationEventName } from "@/common/animations";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";

const initialParticles = [
    // new Particle(100, 100, 140, 3, 3, 0, 0, 5, "red", 50),
    // new Particle(100, 150, 200, -3, -3, 0, 0, 5, "red", 50),
    // new Particle(100, 300, 150, 3, -3, 0, 0, 5, "red", 200),
];
const blocks = [
    new Block(80, 50, 230, 10, "black", 45),
    new Block(50, 130, 200, 10, "black", 45),
    new Block(163, 200, 600, 10, "black", 0),
    new Block(363, 100, 10, 200, "black", 0),
    new Block(163, 51, 10, 167, "black", 0),
];

export default function PreheatsReagents() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const boilerRef = React.useRef<HTMLDivElement>(null);
    const [startAnimation, setStartAnimation] = React.useState<boolean>(false);

    // ref to the ParticleSimulationCanvas
    React.useEffect(() => {
        if (!boilerRef.current) {
            return;
        }
        const boiler = boilerRef.current;
        const spawnParticle = () => {
            const particleVy = Math.floor(Math.random() * 5) + 1;
            particles.current.push(new Particle(30, 30, 40, 3, particleVy, 0, 0, 5, "red", 200));

            const spawnDelay = Math.floor(Math.random() * 201) + 200; // randomize the spawn delay
            timeoutId.current = setTimeout(spawnParticle, spawnDelay);
        };

        const startAnimation = () => {
            // the simulation canvas should already be running. so all we need to do is set the particles
            // particles.current = cloneDeep(initialParticles);
            spawnParticle();
            setStartAnimation(true);
        };

        boiler.addEventListener(startAnimationEventName, startAnimation);
        return () => {
            // cleanup
            boiler.removeEventListener(startAnimationEventName, startAnimation);
            clearTimeout(timeoutId.current);
        };
    }, [boilerRef]);
    return (
        <div ref={boilerRef}>
            <ParticleSimulationCanvas
                startAnimation={startAnimation}
                particles={particles}
                blocks={blocks}
                canvasWidth={500}
                canvasHeight={500}
                isCollisionEnabled={true}
            />
        </div>
    );
}
