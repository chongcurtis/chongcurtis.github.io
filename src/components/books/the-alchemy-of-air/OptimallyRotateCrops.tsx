import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import useAnimationStateEventListener from "@/common/useAnimationEventListener";
import { AnimationState } from "@/common/animations";

export default function OptimallyRotateCrops() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const spawnFieldRowTimeoutId = React.useRef<NodeJS.Timeout>();
    const spawnFieldTypesTimeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, animationState, hasStartEventFired] = useAnimationStateEventListener();
    const animationStateRef = React.useRef(AnimationState.BEFORE_START);

    const fieldTypeColors = ["#7ac8ff", "#fc9144", "#a8ffba"];

    const INCREASE_PARTICLE_RADIUS_DELAY = 20;
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
                    40
                )
            );
        }
    };

    const increaseParticleRadius = () => {
        if (animationStateRef.current === AnimationState.PAUSED) {
            clearTimeout(timeoutId.current);
            return;
        }
        for (let i = 0; i < particles.current.length; i++) {
            if (particles.current[i].radius < 5) {
                particles.current[i].radius += 0.3;
            }
        }
        timeoutId.current = setTimeout(increaseParticleRadius, INCREASE_PARTICLE_RADIUS_DELAY);
    };

    const spawnFieldRows = (ithRow: number, ithFieldType: number) => {
        if (animationStateRef.current === AnimationState.PAUSED) {
            clearTimeout(spawnFieldRowTimeoutId.current);
            return;
        }
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
        if (animationStateRef.current === AnimationState.PAUSED) {
            clearTimeout(spawnFieldTypesTimeoutId.current);
            return;
        }
        ithFieldType = ithFieldType % fieldTypeColors.length;
        spawnFieldRows(0, ithFieldType);
        spawnFieldTypesTimeoutId.current = setTimeout(
            () => spawnFieldTypes(ithFieldType + 1),
            1100
        );
    };

    const start = () => {
        spawnFieldTypes(fieldTypeColors.length);
        timeoutId.current = setTimeout(increaseParticleRadius, INCREASE_PARTICLE_RADIUS_DELAY);
    };

    useEffect(() => {
        animationStateRef.current = animationState;
        if (animationState === AnimationState.RUNNING) {
            clearTimeout(timeoutId.current);
            clearTimeout(spawnFieldRowTimeoutId.current);
            clearTimeout(spawnFieldTypesTimeoutId.current);
            start();
        }
    }, [animationState]);

    useEffect(() => {
        if (hasStartEventFired) {
        }
        return () => {
            clearTimeout(timeoutId.current);
            clearTimeout(spawnFieldRowTimeoutId.current);
            clearTimeout(spawnFieldTypesTimeoutId.current);
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
