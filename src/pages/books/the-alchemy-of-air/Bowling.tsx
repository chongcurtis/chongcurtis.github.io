import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import React, { useEffect } from "react";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import useAnimationEventListener from "@/common/useAnimationEventListener";

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
    const particles = React.useRef<Particle[]>(pins);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();

    const shootBowlingBall = () => {
        const vx = 9;
        const vy = 0;

        particles.current.push(new Particle(100, 0, 103, vx, vy, 0, 0, 10, "#fcb1f9", 200));
    };
    useEffect(() => {
        if (!startAnimationEventFired) {
            return;
        }
        shootBowlingBall();
        return () => {
            // clearTimeout(timeoutId.current);
        };
    }, [startAnimationEventFired]);

    return (
        <div ref={elementRef} className="relative">
            <p className="fade-in-on-scroll-slow animation-delay-2002 absolute left-1/2 top-1/2 z-20 -translate-x-[50%] -translate-y-[20%] transform md:text-2xl">
                Eureka
            </p>
            <ParticleSimulationCanvas
                startAnimation={startAnimationEventFired}
                particles={particles}
                blocks={[]}
                canvasWidth={500}
                canvasHeight={200}
                isCollisionEnabled={true}
                extraClassNames="animation-delay-800"
            />
        </div>
    );
}
