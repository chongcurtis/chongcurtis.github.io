import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import useAnimationStateEventListener from "@/common/useAnimationEventListener";

export default function CultivateAllArableLand() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const spawnFieldRowTimeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, animationState, hasStartEventFired] = useAnimationStateEventListener();

    const offsetY = 10;
    const offsetX = 30;
    const rowSpacing = 30;
    const columnSpacing = 30;

    const spawnFieldRow = (ithRow: number) => {
        for (let ithCol = 0; ithCol < 15; ithCol++) {
            particles.current.push(
                new Particle(
                    10,
                    offsetX + ithCol * columnSpacing,
                    offsetY + ithRow * rowSpacing,
                    0,
                    0,
                    0,
                    0,
                    1,
                    "#a8ffba",
                    1000
                )
            );
        }
    };

    const increaseParticleRadius = () => {
        for (let i = 0; i < particles.current.length; i++) {
            if (particles.current[i].radius < 5) {
                particles.current[i].radius += 0.2;
            }
        }
        timeoutId.current = setTimeout(increaseParticleRadius, 100);
    };

    const spawnFieldRows = (ithRow: number) => {
        if (ithRow >= 6) {
            return;
        }
        spawnFieldRow(ithRow);
        spawnFieldRowTimeoutId.current = setTimeout(() => spawnFieldRows(ithRow + 1), 400);
    };

    useEffect(() => {
        if (hasStartEventFired) {
            spawnFieldRows(0);
            timeoutId.current = setTimeout(increaseParticleRadius, 100);
        }
        return () => {
            clearTimeout(timeoutId.current);
            clearTimeout(spawnFieldRowTimeoutId.current);
        };
    }, [hasStartEventFired]);

    return (
        <div
            className="is-persistent-animation dummy-animation flex flex-col items-center justify-center"
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
