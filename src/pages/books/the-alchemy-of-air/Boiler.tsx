import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import React from "react";

export default function Boiler() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    // ref to the ParticleSimulationCanvas
    React.useEffect(() => {
        const spawnParticle = () => {
            const canvas = canvasRef.current;
            if (canvas) {
            }
            const randomTimeout = Math.floor(Math.random() * 101) + 100; // Generate a random time interval between 100-200ms
            timeoutId.current = setTimeout(spawnParticle, randomTimeout);
        };
        return () => {
            clearTimeout(timeoutId.current);
        };
    });
    return (
        <div>
            <ParticleSimulationCanvas
                canvasRef={canvasRef}
                particles={[
                    new Particle(100, 100, 140, 3, 3, 0, 0, 5, "red"),
                    new Particle(100, 150, 200, -3, -3, 0, 0, 5, "red"),
                ]}
                surfaces={[]}
                canvasWidth={500}
                canvasHeight={500}
            />
        </div>
    );
}
