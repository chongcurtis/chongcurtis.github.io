import React, { useEffect } from "react";
import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import useAnimationEventListener from "@/common/useAnimationEventListener";
import { startAnimationEventName } from "@/common/animations";

export default function BulletsStrikeSand() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();

    const blocks = [new Block(250, 175, 500, 50, "#b87f54", 0)];
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
                    Math.random(),
                    "#87552f",
                    50
                )
            );
        }
    };

    const slowStrike = () => {
        const middleX = Math.random() * 100 + 50;
        createStrike(middleX + 50, 150);
        setTimeout(() => createStrike(middleX + 70, 150), 300);
        setTimeout(() => createStrike(middleX + 120, 150), 900);
        setTimeout(() => createStrike(middleX + 300, 150), 1500);
        setTimeout(createStrikes, 2000);
    };
    const lineStrike = () => {
        const middleX = Math.random() * 200 + 50;
        for (let i = 0; i < 10; i++) {
            setTimeout(() => createStrike(middleX + i * 30, 150), i * 100);
        }
        setTimeout(createStrikes, 1500);
    };
    const oneSpotStrike = () => {
        const middleX = Math.random() * 400 + 50;
        for (let i = 0; i < 8; i++) {
            const x = middleX + (Math.random() - 0.5) * 30;
            setTimeout(() => createStrike(x, 150), i * 80);
        }
        setTimeout(createStrikes, 1500);
    };
    const strikes = [slowStrike, lineStrike, oneSpotStrike];
    const createStrikes = () => {
        const strike = strikes[Math.floor(Math.random() * strikes.length)];
        strike();
    };

    useEffect(() => {
        if (!startAnimationEventFired) {
            return;
        }
        slowStrike();
        return () => {
            // cleanup
            clearTimeout(timeoutId.current);
        };
    }, [startAnimationEventFired]);

    return (
        <div ref={elementRef} className="relative">
            <p className="fade-in-on-scroll-slow absolute left-1/2 top-1/2 z-20 -translate-x-[50%] -translate-y-[20%] transform text-2xl font-thin italic md:text-6xl">
                World War 1
            </p>
            <ParticleSimulationCanvas
                startAnimation={startAnimationEventFired}
                particles={particles}
                blocks={blocks}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={false}
            />
        </div>
    );
}
