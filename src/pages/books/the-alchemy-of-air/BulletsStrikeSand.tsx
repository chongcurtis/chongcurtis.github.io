import React, { useEffect } from "react";
import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import useAnimationEventListener from "@/common/useAnimationEventListener";
import { startAnimationEventName } from "@/common/animations";

export default function BulletsStrikeSand() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const elementRef = React.useRef<HTMLDivElement>(null);
    const [startAnimation, setStartAnimation] = React.useState<boolean>(false);

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
        setTimeout(createStrikes, 1800);
    };
    const lineStrike = () => {
        const middleX = Math.random() * 200 + 50;
        for (let i = 0; i < 10; i++) {
            setTimeout(() => createStrike(middleX + i * 30, 150), i * 100);
        }
        setTimeout(createStrikes, 1000);
    };
    const oneSpotStrike = () => {
        const middleX = Math.random() * 400 + 50;
        for (let i = 0; i < 8; i++) {
            const x = middleX + (Math.random() - 0.5) * 30;
            setTimeout(() => createStrike(x, 150), i * 80);
        }
        setTimeout(createStrikes, 1000);
    };
    const strikes = [slowStrike, lineStrike, oneSpotStrike];
    const createStrikes = () => {
        const strike = strikes[Math.floor(Math.random() * strikes.length)];
        strike();
    };
    const startStrikes = () => {
        slowStrike();
        setStartAnimation(true);
    };

    useEffect(() => {
        if (!elementRef.current) {
            return;
        }
        const element = elementRef.current;
        element.addEventListener(startAnimationEventName, startStrikes);
        return () => {
            // cleanup
            element.removeEventListener(startAnimationEventName, startStrikes);
            clearTimeout(timeoutId.current);
        };
    }, [elementRef]);

    return (
        <div ref={elementRef}>
            <ParticleSimulationCanvas
                startAnimation={startAnimation}
                particles={particles}
                blocks={blocks}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={false}
            />
        </div>
    );
}
