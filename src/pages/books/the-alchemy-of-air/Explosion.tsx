import React, { useEffect } from "react";
import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import useAnimationEventListener from "@/common/useAnimationEventListener";

export default function Explosion() {
    const timeoutId = React.useRef<NodeJS.Timeout>();
    const particles = React.useRef<Particle[]>([]);
    const [elementRef, startAnimationEventFired] = useAnimationEventListener();

    const createExplosionParticle = (color: string): Particle => {
        const x = 250;
        const y = 200;
        return new Particle(
            1,
            x,
            y,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            0,
            0.25,
            Math.random(),
            color,
            50
        );
    };

    const explosion = () => {
        for (let i = 0; i < 50; i++) {
            particles.current.push(createExplosionParticle("#ff6912"));
        }
        for (let i = 0; i < 50; i++) {
            particles.current.push(createExplosionParticle("#eb4034"));
        }
    };

    useEffect(() => {
        if (!startAnimationEventFired) {
            return;
        }
        explosion();
        return () => {
            // cleanup
            clearTimeout(timeoutId.current);
        };
    }, [startAnimationEventFired]);

    return (
        <div ref={elementRef} className="relative">
            <p className="fade-in-on-scroll-slow animation-delay-1000 absolute left-1/2 top-1/2 z-20 -translate-x-[50%] -translate-y-[20%] transform font-bold md:text-2xl">
                But they kept exploding
            </p>
            <ParticleSimulationCanvas
                startAnimation={startAnimationEventFired}
                particles={particles}
                blocks={[]}
                canvasWidth={500}
                canvasHeight={400}
                isCollisionEnabled={false}
                extraClassNames="animation-delay-800"
            />
        </div>
    );
}
