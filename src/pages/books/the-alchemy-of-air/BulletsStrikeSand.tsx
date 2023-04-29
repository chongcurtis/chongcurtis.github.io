import React from "react";
import { Body } from "@/pages/books/the-dark-forest/Body";
import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";

export default function BulletsStrikeSand() {
    const particles = React.useRef<Particle[]>([]);
    const createStrike = (x: number, y: number) => {
        const numDustParticles = 10;
        for (let i = 0; i < numDustParticles; i++) {
            particles.current.push(
                new Particle(
                    1,
                    x,
                    y,
                    Math.random() * 2,
                    -Math.random() * 10 - 3,
                    0,
                    0.25,
                    1,
                    "#000000",
                    100
                )
            );
        }
    };
    React.useEffect(() => {
        createStrike(50, 350);
        setTimeout(() => createStrike(50, 350), 300);
        setTimeout(() => createStrike(120, 350), 900);
        setTimeout(() => createStrike(300, 350), 1500);
    }, []);

    return (
        <div className="h-[350px] w-[350px] md:h-[500px] md:w-[500px]">
            <ParticleSimulationCanvas
                blocks={[new Block(0, 350, 400, 5, "#000000", 0)]}
                particles={particles}
                canvasWidth={1000}
                canvasHeight={1000}
                checkCollision={false}
            />
        </div>
    );
}
