import React from "react";
import { startAnimationEventName } from "@/common/animations";
import cloneDeep from "lodash.clonedeep";
import { Surface } from "@/pages/books/the-alchemy-of-air/Surface";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";

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
    const SIMULATION_SPEED = 30; // 40ms between each frame = 25fps
    const VELOCITY_STEP_SIZE = 10; // in terms of seconds
    let G = 100;

    // if you don't want the bodies to fly off the screent, make the initial momentums sum to 0

    function setupCanvas(canvas: HTMLCanvasElement) {
        // Fixes the DPI of the canvas
        const dpr = window.devicePixelRatio || 1;
        // const rect = canvas.getBoundingClientRect();
        canvas.width = canvas.width * dpr;
        canvas.height = canvas.height * dpr;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(dpr, dpr);
        return ctx;
    }

    function drawBodies(ctx: CanvasRenderingContext2D) {
        particles.current.forEach((particle) => {
            ctx.beginPath();
            ctx.arc(particle.x(), particle.y(), particle.r, 0, 2 * Math.PI, false);
            //ctx.fillStyle = '#ff7824';
            ctx.fillStyle = particle.color;
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = particle.color;
            ctx.stroke();
        });
    }

    function run(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        //console.log(bodies);
        let canvasW = canvas.width;
        let canvasH = canvas.height;
        let n = particles.current.length;

        // figure out new velocities and positions
        for (let i = 0; i < n; i++) {
            const p = particles.current[i];
            p.simulate();
        }

        ctx.clearRect(0, 0, canvasW, canvasH);
        drawBodies(ctx);
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
