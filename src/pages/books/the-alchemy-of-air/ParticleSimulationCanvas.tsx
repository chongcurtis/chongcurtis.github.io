import React from "react";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import Vector2 from "@/pages/books/the-alchemy-of-air/Vector2";

type Props = {
    particles: React.MutableRefObject<Particle[]>;
    blocks: Block[];
    canvasWidth: number;
    canvasHeight: number;
};
export default function ParticleSimulationCanvas({
    particles,
    blocks,
    canvasWidth,
    canvasHeight,
}: Props) {
    const SIMULATION_SPEED = 100; // 40ms between each frame = 25fps

    const ENERGY_RETAINMENT_ON_COLLISION_DECIMAL = 1;
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        // console.log("useEffect canvas");

        const canvas = canvasRef.current;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = setupCanvas(canvas);
        setInterval(function () {
            run(canvas, ctx);
        }, SIMULATION_SPEED); //this is the cycle
        ctx.font = "30px Arial";
    }, [canvasRef]);

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
        particles.current!!.forEach((particle) => {
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x(), particle.y(), particle.radius, 0, 2.0 * Math.PI, false);
            ctx.closePath();
            ctx.fill();

            // Without this stroke, the colliding particles don't appear to touch
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        blocks.forEach((block) => {
            // now draw rectangles
            ctx.translate(block.x, block.y);
            ctx.rotate(286.479); // 5rad
            ctx.fillRect(-block.w / 2, -block.h / 2, block.w, block.h);
            ctx.rotate(-286.479);
            ctx.translate(-block.x, -block.y);
        });
    }

    function isParticleAlive(particle: Particle): boolean {
        return (
            particle.timeToLive > 0 &&
            0 <= particle.y() &&
            particle.y() <= canvasHeight &&
            0 <= particle.x() &&
            particle.x() <= canvasWidth
        );
    }

    function run(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        if (!particles.current) {
            return;
        }
        //console.log(bodies);
        let canvasW = canvas.width;
        let canvasH = canvas.height;

        particles.current = particles.current.filter(isParticleAlive);

        // figure out new velocities and positions
        for (let i = 0; i < particles.current.length; i++) {
            const p1 = particles.current[i];
            p1.simulate();
            for (let j = i + 1; j < particles.current.length; j++) {
                let p2 = particles.current[j];
                handleBallCollision(p1, p2);
            }

            for (let j = 0; j < blocks.length; j++) {
                let block = blocks[j];
                handleBlockCollision(p1, block);
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

    //detect if a circle intersects with a rotated rectangle
    //https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection

    function intersects(
        circle_center: [number, number],
        circle_radius: number,
        rectangle_center: [number, number],
        rectangle_size: [number, number],
        rectangle_angle: number
    ): boolean {
        // Convert the angle of rotation to radians
        const theta = (rectangle_angle * Math.PI) / 180;

        // Find the corners of the rotated rectangle
        const [w, h] = rectangle_size;
        const [x, y] = rectangle_center;
        const vertices: [number, number][] = [
            [
                x + Math.cos(theta) * (-w / 2) - Math.sin(theta) * (-h / 2),
                y + Math.sin(theta) * (-w / 2) + Math.cos(theta) * (-h / 2),
            ],
            [
                x + Math.cos(theta) * (w / 2) - Math.sin(theta) * (-h / 2),
                y + Math.sin(theta) * (w / 2) + Math.cos(theta) * (-h / 2),
            ],
            [
                x + Math.cos(theta) * (w / 2) - Math.sin(theta) * (h / 2),
                y + Math.sin(theta) * (w / 2) + Math.cos(theta) * (h / 2),
            ],
            [
                x + Math.cos(theta) * (-w / 2) - Math.sin(theta) * (h / 2),
                y + Math.sin(theta) * (-w / 2) + Math.cos(theta) * (h / 2),
            ],
        ];

        // Find the vectors and perpendicular vectors between each pair of adjacent vertices
        const vectors: [number, number][] = [
            [vertices[1][0] - vertices[0][0], vertices[1][1] - vertices[0][1]],
            [vertices[2][0] - vertices[1][0], vertices[2][1] - vertices[1][1]],
            [vertices[3][0] - vertices[2][0], vertices[3][1] - vertices[2][1]],
            [vertices[0][0] - vertices[3][0], vertices[0][1] - vertices[3][1]],
        ];
        const perp_vectors: [number, number][] = vectors.map(([x, y]) => [-y, x]);
        const normal_vectors: number[] = perp_vectors.map(([x, y]) => Math.sqrt(x ** 2 + y ** 2));
        const normalized_perp_vectors: [number, number][] = perp_vectors.map(([x, y], i) => [
            x / normal_vectors[i],
            y / normal_vectors[i],
        ]);

        // Check if any of the perpendicular vectors is closer to the circle center than the circle radius
        for (let i = 0; i < vectors.length; i++) {
            const dot_product =
                (circle_center[0] - vertices[i][0]) * normalized_perp_vectors[i][0] +
                (circle_center[1] - vertices[i][1]) * normalized_perp_vectors[i][1];
            if (Math.abs(dot_product) > circle_radius) {
                return false;
            }
        }

        // If none of the perpendicular vectors is too far from the circle center, then the circle intersects the rectangle
        return true;
    }

    function handleBlockCollision(p: Particle, b: Block) {
        if (intersects([p.x(), p.y()], p.radius, [b.x, b.y], [b.w, b.h], 5)) {
            alert("collision");
        }
    }

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            // NOTE: the fade-in-on-scroll is really important because without it the startAnimationEvent won't be called for this canvas
            className="fade-in-on-scroll h-full w-full bg-background-color"
        />
    );
}
