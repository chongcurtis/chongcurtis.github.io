import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import useAnimationEventListener from "@/common/useAnimationEventListener";

export default function IncreaseFertilityOfLand() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const SpawnCropsTimeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();

    const offsetY = 10;
    const offsetX = 30;
    const rowSpacing = 30;
    const columnSpacing = 30;

    const spawnRandomCircle = () => {
        particles.current.push(
            new Particle(
                10,
                Math.random() * 500,
                Math.random() * 200,
                0,
                0,
                0,
                0,
                1,
                "#a8ffba",
                1000
            )
        );
    };

    const increaseParticleRadius = () => {
        for (let i = 0; i < particles.current.length; i++) {
            if (particles.current[i].radius < ((i % 5) + 1) * 15) {
                particles.current[i].radius += 1;
            }
        }
        timeoutId.current = setTimeout(increaseParticleRadius, 100);
    };

    const spawnCrops = (numCrops: number) => {
        if (numCrops == 0) {
            return;
        }
        spawnRandomCircle();
        SpawnCropsTimeoutId.current = setTimeout(() => spawnCrops(numCrops - 1), 300);
    };

    useEffect(() => {
        if (!startAnimationEventFired) {
            return;
        }
        spawnCrops(30);
        timeoutId.current = setTimeout(increaseParticleRadius, 100);
        return () => {
            clearTimeout(timeoutId.current);
            clearTimeout(SpawnCropsTimeoutId.current);
        };
    }, [startAnimationEventFired]);

    return (
        <div className="flex flex-col items-center justify-center" ref={elementRef}>
            <ParticleSimulationCanvas
                animationState={startAnimationEventFired}
                particles={particles}
                blocks={[]}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={false}
            />
        </div>
    );
}
