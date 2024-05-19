import ParticleSimulationCanvas from "@/components/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/components/books/the-alchemy-of-air/Block";
import useAnimationStateEventListener from "@/common/useAnimationEventListener";
import cloneDeep from "lodash.clonedeep";

const PIN_COLOR = "#8ff2c3";
// setup bowling pins
const pins = [
    new Particle(10, 200, 100, 0, 0, 0, 0, 5, PIN_COLOR, 10000),
    new Particle(10, 210, 110, 0, 0, 0, 0, 5, PIN_COLOR, 10000),
    new Particle(10, 210, 90, 0, 0, 0, 0, 5, PIN_COLOR, 10000),
    // third row
    new Particle(10, 220, 100, 0, 0, 0, 0, 5, PIN_COLOR, 10000),
    new Particle(10, 220, 120, 0, 0, 0, 0, 5, PIN_COLOR, 10000),
    new Particle(10, 220, 80, 0, 0, 0, 0, 5, PIN_COLOR, 10000),
    // last row
    new Particle(10, 230, 110, 0, 0, 0, 0, 5, PIN_COLOR, 10000),
    new Particle(10, 230, 90, 0, 0, 0, 0, 5, PIN_COLOR, 10000),
    new Particle(10, 230, 70, 0, 0, 0, 0, 5, PIN_COLOR, 10000),
    new Particle(10, 230, 130, 0, 0, 0, 0, 5, PIN_COLOR, 10000),
];

export default function Bowling() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>(cloneDeep(pins));
    const [elementRef, animationState, hasStartEventFired] = useAnimationStateEventListener();

    const shootBowlingBall = () => {
        const vx = 5;
        const vy = 0;

        particles.current.push(new Particle(100, 20, 103, vx, vy, 0, 0, 10, "#fcb1f9", 200));
    };
    useEffect(() => {
        if (!hasStartEventFired) {
            return;
        }
        timeoutId.current = setTimeout(shootBowlingBall, 1200);
        return () => {
            clearTimeout(timeoutId.current);
        };
    }, [hasStartEventFired]);

    return (
        <div ref={elementRef} className="dummy-animation is-persistent-animation relative">
            <ParticleSimulationCanvas
                animationState={animationState}
                particles={particles}
                blocks={[]}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={true}
                extraClassNames="animation-delay-1"
                updateCountReactedTo={110}
            />
            <p className="fade-in-on-scroll-slow wait-animation-update-count-110 absolute left-1/2 top-1/2 z-20 -translate-x-[50%] -translate-y-[20%] transform md:text-2xl">
                Eureka
            </p>
        </div>
    );
}
