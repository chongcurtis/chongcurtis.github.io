import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import React from "react";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import { NITROGEN_COLOR } from "@/pages/books/the-alchemy-of-air/constants";
import { startAnimationEventName } from "@/common/animations";

const initialParticles = [
    // new Particle(100, 100, 140, 3, 3, 0, 0, 5, "red", 50),
    // new Particle(100, 150, 200, -3, -3, 0, 0, 5, "red", 50),
    // new Particle(100, 300, 150, 3, -3, 0, 0, 5, "red", 200),
];
const blocks = [new Block(250, 100, 1, 1, "white", 45)];

// this animation works by spawning two particles close to each other (but not touching) and sending them to the right
// in the middle of the canvas, there is a rotated square (at a 45 degree angle) that the particles will collide with, splitting them apart
export default function FixNitrogen() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const canvasRef = React.useRef<HTMLDivElement>(null);
    const calledStartAnimation = React.useRef<boolean>(false); // needed because of strict mode I think, calling the canvas twice
    const [startAnimation, setStartAnimation] = React.useState<boolean>(false);

    // ref to the ParticleSimulationCanvas
    React.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas = canvasRef.current;
        const spawnNitrogenPair = () => {
            particles.current.push(new Particle(100, 0, 95, 3, 0, 0, 0, 5, NITROGEN_COLOR, 200));
            particles.current.push(new Particle(100, 0, 105, 3, 0, 0, 0, 5, NITROGEN_COLOR, 200));

            const spawnDelay = 1000;
            timeoutId.current = setTimeout(spawnNitrogenPair, spawnDelay);
        };
        const startAnimation = () => {
            if (calledStartAnimation.current) {
                return;
            }
            calledStartAnimation.current = true;
            spawnNitrogenPair();
            setStartAnimation(true);
        };

        canvas.addEventListener(startAnimationEventName, startAnimation);
        return () => {
            // cleanup
            canvas.removeEventListener(startAnimationEventName, startAnimation);
            clearTimeout(timeoutId.current);
        };
    }, [canvasRef]);
    return (
        <div ref={canvasRef}>
            <ParticleSimulationCanvas
                startAnimation={startAnimation}
                particles={particles}
                blocks={blocks}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={true}
            />
        </div>
    );
}
