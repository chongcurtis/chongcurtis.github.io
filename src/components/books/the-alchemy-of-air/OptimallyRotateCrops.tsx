import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import useAnimationEventListener from "@/common/useAnimationEventListener";

export default function OptimallyRotateCrops() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const spawnFieldRowTimeoutId = React.useRef<NodeJS.Timeout>();
    const spawnFieldTypesTimeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();

    const fieldTypeColors = ["#7ac8ff", "#fc9144", "#a8ffba"];

    const offsetY = 10;
    const offsetX = 30;
    const rowSpacing = 30;
    const columnSpacing = 30;

    const spawnFieldRow = (ithRow: number, ithFieldType: number) => {
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
                    fieldTypeColors[ithFieldType],
                    30
                )
            );
        }
    };

    const increaseParticleRadius = () => {
        for (let i = 0; i < particles.current.length; i++) {
            if (particles.current[i].radius < 5) {
                particles.current[i].radius += 0.4;
            }
        }
        timeoutId.current = setTimeout(increaseParticleRadius, 100);
    };

    const spawnFieldRows = (ithRow: number, ithFieldType: number) => {
        if (ithRow >= 6) {
            return;
        }
        spawnFieldRow(ithRow, ithFieldType);
        spawnFieldRowTimeoutId.current = setTimeout(
            () => spawnFieldRows(ithRow + 1, ithFieldType),
            150
        );
    };

    const spawnFieldTypes = (ithFieldType: number) => {
        ithFieldType = ithFieldType % fieldTypeColors.length;
        spawnFieldRows(0, ithFieldType);
        spawnFieldTypesTimeoutId.current = setTimeout(
            () => spawnFieldTypes(ithFieldType + 1),
            1100
        );
    };

    useEffect(() => {
        if (startAnimationEventFired) {
            spawnFieldTypes(fieldTypeColors.length);
            timeoutId.current = setTimeout(increaseParticleRadius, 100);
        }
        return () => {
            clearTimeout(timeoutId.current);
            clearTimeout(spawnFieldRowTimeoutId.current);
            clearTimeout(spawnFieldTypesTimeoutId.current);
        };
    }, [startAnimationEventFired]);

    return (
        <div className="flex flex-col items-center justify-center" ref={elementRef}>
            <ParticleSimulationCanvas
                startAnimation={startAnimationEventFired}
                particles={particles}
                blocks={[]}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={false}
            />
        </div>
    );
}
