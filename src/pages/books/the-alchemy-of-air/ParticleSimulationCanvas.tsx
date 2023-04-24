import React from "react";
import { startAnimationEventName } from "@/common/animations";
import cloneDeep from "lodash.clonedeep";
import { Surface } from "@/pages/books/the-alchemy-of-air/Surface";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import Vector2 from "@/pages/books/the-alchemy-of-air/Vector2";

type Props = {
    particles: Particle[];
    surfaces: Surface[];
    canvasWidth: number;
    canvasHeight: number;
};
export default function ParticleSimulationCanvas({
    particles: initialParticles,
    surfaces,
    canvasWidth,
    canvasHeight,
}: Props) {
    const particles = React.useRef(cloneDeep(initialParticles));
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const SIMULATION_SPEED = 100; // 40ms between each frame = 25fps

    const ENERGY_RETAINMENT_ON_COLLISION_DECIMAL = 1;

    // if you don't want the bodies to fly off the screent, make the initial momentums sum to 0

    function setupCanvas(canvas: HTMLCanvasElement) {
        // Fixes the DPI of the canvas
        const dpr = window.devicePixelRatio || 1;
        // console.log(dpr);
        // canvas.width = canvas.width * dpr;
        // canvas.height = canvas.height * dpr;
        canvas.width = canvas.width * dpr;
        canvas.height = canvas.height * dpr;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(dpr, dpr);
        return ctx;
    }

    function drawBodies(ctx: CanvasRenderingContext2D) {
        particles.current.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x(), particle.y(), particle.radius, 0, 2.0 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        });
    }

    function run(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        //console.log(bodies);
        let canvasW = canvas.width;
        let canvasH = canvas.height;

        // figure out new velocities and positions
        for (let i = 0; i < particles.current.length; i++) {
            const p1 = particles.current[i];
            p1.simulate();
            for (let j = i + 1; j < particles.current.length; j++) {
                let p2 = particles.current[j];
                // TODO: make a const for the restitution
                handleBallCollision(p1, p2);
            }
        }

        ctx.clearRect(0, 0, canvasW, canvasH);
        drawBodies(ctx);
    }

    function handleBallCollision(p1: Particle, p2: Particle) {
        let dir = new Vector2();
        dir.subtractVectors(p2.position, p1.position);
        let d = dir.length();
        if (d === 0.0 || d > p1.radius + p2.radius) return;

        dir.scale(1.0 / d);

        let corr = (p1.radius + p2.radius - d) / 2.0;
        p1.position.add(dir, -corr);
        p2.position.add(dir, corr);

        let v1 = p1.velocity.dot(dir);
        let v2 = p2.velocity.dot(dir);

        let m1 = p1.mass;
        let m2 = p2.mass;

        let newV1 =
            (m1 * v1 + m2 * v2 - m2 * (v1 - v2) * ENERGY_RETAINMENT_ON_COLLISION_DECIMAL) /
            (m1 + m2);
        let newV2 =
            (m1 * v1 + m2 * v2 - m1 * (v2 - v1) * ENERGY_RETAINMENT_ON_COLLISION_DECIMAL) /
            (m1 + m2);

        p1.velocity.add(dir, newV1 - v1);
        p2.velocity.add(dir, newV2 - v2);
    }

    React.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        // console.log("useEffect canvas");

        const canvas = canvasRef.current;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = setupCanvas(canvas);
        ctx.font = "30px Arial";

        const startAnimation = () => {
            particles.current = cloneDeep(initialParticles);
            // only start the animation once we have the startAnimationEvent
            setInterval(function () {
                run(canvas, ctx);
            }, SIMULATION_SPEED); //this is the cycle
        };

        canvas.addEventListener(startAnimationEventName, startAnimation);
        return () => {
            // cleanup
            canvas.removeEventListener(startAnimationEventName, startAnimation);
        };
    }, [canvasRef]);

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            // NOTE: the fade-in-on-scroll is really important because without it the startAnimationEvent won't be called for this canvas
            className="fade-in-on-scroll h-full w-full bg-background-color"
        />
    );
}
