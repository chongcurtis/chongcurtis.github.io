import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import useAnimationStateEventListener from "@/common/useAnimationEventListener";

export default function IncreaseFertilityOfLand() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const SpawnCropsTimeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, animationState, hasStartEventFired] = useAnimationStateEventListener();

    const INCREASE_RADIUS_DELAY = 20;
    const SPAWN_CROPS_DELAY = 100;

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
                particles.current[i].radius += 0.2;
            }
        }
        timeoutId.current = setTimeout(increaseParticleRadius, INCREASE_RADIUS_DELAY);
    };

    const spawnCrops = (numCrops: number) => {
        if (numCrops == 0) {
            return;
        }
        spawnRandomCircle();
        SpawnCropsTimeoutId.current = setTimeout(() => spawnCrops(numCrops - 1), SPAWN_CROPS_DELAY);
    };

    useEffect(() => {
        if (!hasStartEventFired) {
            return;
        }
        spawnCrops(30);
        timeoutId.current = setTimeout(increaseParticleRadius, INCREASE_RADIUS_DELAY);
        return () => {
            clearTimeout(timeoutId.current);
            clearTimeout(SpawnCropsTimeoutId.current);
        };
    }, [hasStartEventFired]);

    return (
        <div
            className="dummy-animation is-persistent-animation flex flex-col items-center justify-center"
            ref={elementRef}
        >
            <ParticleSimulationCanvas
                animationState={animationState}
                particles={particles}
                blocks={[]}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={false}
            />
        </div>
    );
}
