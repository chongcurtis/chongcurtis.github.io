import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/components/books/the-alchemy-of-air/Block";
import useAnimationStateEventListener from "@/common/useAnimationEventListener";
import { BACKGROUND_COLOR, NITROGEN_COLOR } from "./constants";
import { AnimationState } from "@/common/animations";

const BOX_COLOR = BACKGROUND_COLOR;
// const BOX_COLOR = "#dedede";
const blocks = [
    new Block(250, 0, 400, 70, BOX_COLOR, 0),
    new Block(190, 70, 100, 70, BOX_COLOR, 45),
    new Block(310, 70, 100, 70, BOX_COLOR, 135),
    new Block(250, 85, 200, 30, BOX_COLOR, 0),
];

// this animation works by spawning two particles close to each other (but not touching) and sending them to the right
// in the middle of the canvas, there is a rotated square (at a 45 degree angle) that the particles will collide with, splitting them apart
export default function CubicDrop() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const dripTimeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, animationState, hasStartEventFired] = useAnimationStateEventListener();
    const animationStateRef = React.useRef(AnimationState.BEFORE_START);

    const spawnHotAtom = () => {
        if (animationStateRef.current === AnimationState.PAUSED) {
            clearTimeout(timeoutId.current);
            return;
        }
        const vx = Math.floor(Math.random() * 3) + 1;
        const vy = Math.floor(Math.random() * 3) + 1;

        particles.current.push(new Particle(100, 250, 50, vx, vy, 0, 0, 3, "red", 40));

        const spawnDelay = 100;
        timeoutId.current = setTimeout(spawnHotAtom, spawnDelay);
    };

    const spawnDrip = () => {
        if (animationStateRef.current === AnimationState.PAUSED) {
            clearTimeout(dripTimeoutId.current);
            return;
        }
        particles.current.push(new Particle(100, 250, 100, 0, 0, 0, 0.5, 3, NITROGEN_COLOR, 30));
        dripTimeoutId.current = setTimeout(spawnDrip, 1000);
    };
    useEffect(() => {
        animationStateRef.current = animationState;
        if (animationState === AnimationState.RUNNING) {
            clearTimeout(timeoutId.current);
            clearTimeout(dripTimeoutId.current);
            spawnHotAtom();
            spawnDrip();
        }
    }, [animationState]);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutId.current);
            clearTimeout(dripTimeoutId.current);
        };
    }, [hasStartEventFired]);

    return (
        <div className="dummy-animation is-persistent-animation " ref={elementRef}>
            <ParticleSimulationCanvas
                animationState={animationState}
                particles={particles}
                blocks={blocks}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={true}
            />
        </div>
    );
}
