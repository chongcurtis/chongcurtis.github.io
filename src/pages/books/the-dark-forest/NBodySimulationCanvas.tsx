import React from "react";
import { Body } from "./Body";
import { startAnimationEventName } from "@/common/animations";
import cloneDeep from "lodash.clonedeep";

type Props = {
    bodies: Body[];
    canvasWidth: number;
    canvasHeight: number;
};

export default function NBodySimulationCanvas({
    bodies: initialBodies,
    canvasWidth,
    canvasHeight,
}: Props) {
    const bodies = React.useRef(cloneDeep(initialBodies));
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

    //this reads the javascript array that contains all of the snowflakes and draws them onto the canvas (each snowflake has its own opacity, colour, x,y coords etc. and the draw command renders it)
    function drawBodies(ctx: CanvasRenderingContext2D) {
        bodies.current.forEach((body) => {
            ctx.beginPath();
            ctx.arc(body.x, body.y, body.r, 0, 2 * Math.PI, false);
            //ctx.fillStyle = '#ff7824';
            ctx.fillStyle = body.color;
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = body.color;
            ctx.stroke();
        });
    }

    function run(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        //console.log(bodies);
        let canvasW = canvas.width;
        let canvasH = canvas.height;
        let n = bodies.current.length;
        // reset acceleration
        for (let i = 0; i < n; i++) {
            const b = bodies.current[i];
            b.ax = 0;
            b.ay = 0;
            bodies.current[i] = b;
        }

        // figure out new accelerations between each pair of bodies
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const b1 = bodies.current[i];
                const b2 = bodies.current[j];
                if (b1.group != b2.group) {
                    continue;
                }

                // f = ma, so f/m = a
                const r2 = (b2.x - b1.x) ** 2 + (b2.y - b1.y) ** 2;
                const dist = Math.sqrt(r2);
                const f = Math.min((G * b1.m * b2.m) / r2, 0.1);
                // console.log(f);
                const fx = (f * (b2.x - b1.x)) / dist;
                const fy = (f * (b2.y - b1.y)) / dist;

                b1.ax += fx / b1.m;
                b2.ax -= fx / b2.m;
                b1.ay += fy / b1.m;
                b2.ay -= fy / b2.m;
                //console.log(fx, fy);
            }
        }

        // figure out new velocities and positions
        for (let i = 0; i < n; i++) {
            const b = bodies.current[i];
            b.vx += VELOCITY_STEP_SIZE * b.ax;
            b.vy += VELOCITY_STEP_SIZE * b.ay;

            b.x += b.vx;
            b.y += b.vy;
            bodies.current[i] = b;
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
            bodies.current = cloneDeep(initialBodies);
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
