import React from "react";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import Vector2 from "@/pages/books/the-alchemy-of-air/Vector2";

type Props = {
    particles: React.MutableRefObject<Particle[]>;
    blocks: Block[];
    canvasWidth: number;
    canvasHeight: number;
    isCollisionEnabled: boolean;
};
export default function ParticleSimulationCanvas({
    particles,
    blocks,
    canvasWidth,
    canvasHeight,
    isCollisionEnabled,
}: Props) {
    const SIMULATION_SPEED = 100; // 40ms between each frame = 25fps

    const COEFFICIENT_OF_RESTITUTION = 1; // the ratio of the final to initial relative speed between two objects after they collide.
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
            ctx.arc(particle.x, particle.y, particle.radius, 0, 2.0 * Math.PI, false);
            ctx.closePath();
            ctx.fill();

            // Without this stroke, the colliding particles don't appear to touch
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        blocks.forEach((block) => {
            const rotationInRads = block.rotationDegrees * (Math.PI / 180);
            // now draw rectangles
            // ctx.translate(block.x, block.y);
            // ctx.rotate(rotationInRads);
            // ctx.translate(-block.x, -block.y);
            //
            // ctx.fillRect(block.x, block.y, block.width, block.height);
            // ctx.rotate(-rotationInRads);
            const halfWidth = block.width / 2;
            const halfHeight = block.height / 2;

            ctx.translate(block.position.x, block.position.y);
            ctx.rotate(rotationInRads); // rotate the canvas by 45 degrees
            ctx.fillStyle = "red"; // set the fill color

            // ctx.strokeStyle = block.color;
            // ctx.lineWidth = 2;
            // ctx.stroke();
            ctx.fillRect(-halfWidth, -halfHeight, block.width, block.height); // draw the rectangle centered on the origin

            ctx.rotate(-rotationInRads); // rotate the canvas by 45 degrees
            ctx.translate(-block.position.x, -block.position.y);
            // ctx.restore(); // restore the canvas to its original state
        });
    }

    function isParticleAlive(particle: Particle): boolean {
        return (
            particle.timeToLive > 0 &&
            0 <= particle.y &&
            particle.y <= canvasHeight &&
            0 <= particle.x &&
            particle.x <= canvasWidth
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
            if (!isCollisionEnabled) {
                continue;
            }
            for (let j = i + 1; j < particles.current.length; j++) {
                let p2 = particles.current[j];
                handleBallCollision(p1, p2);
            }

            for (let j = 0; j < blocks.length; j++) {
                let block = blocks[j];
                // the prompt:
                // simulate a circle colliding with a rotated rectangle and it bouncing off
                // - it generated written instructions
                // give me this code in typescript
                if (checkCollision(p1, block)) {
                    handleBlockCollision(p1, block);
                }
            }
        }

        ctx.clearRect(0, 0, canvasW, canvasH);
        drawBodies(ctx);
    }

    function handleBallCollision(p1: Particle, p2: Particle) {
        let dir = p2.position.subtract(p1.position);
        let d = dir.length();
        if (d === 0.0 || d > p1.radius + p2.radius) return;

        dir.scale(1.0 / d);

        let corr = (p1.radius + p2.radius - d) / 2.0;
        p1.position = p1.position.add(dir, -corr);
        p2.position = p2.position.add(dir, corr);

        let v1 = p1.velocity.dot(dir);
        let v2 = p2.velocity.dot(dir);

        let m1 = p1.mass;
        let m2 = p2.mass;

        let newV1 = (m1 * v1 + m2 * v2 - m2 * (v1 - v2) * COEFFICIENT_OF_RESTITUTION) / (m1 + m2);
        let newV2 = (m1 * v1 + m2 * v2 - m1 * (v2 - v1) * COEFFICIENT_OF_RESTITUTION) / (m1 + m2);

        p1.velocity = p1.velocity.add(dir, newV1 - v1);
        p2.velocity = p2.velocity.add(dir, newV2 - v2);
    }

    function rotatePoint(point: Vector2, center: Vector2, angle: number): Vector2 {
        const translatedPoint = point.subtract(center);

        const rotatedPoint = new Vector2(
            translatedPoint.x * Math.cos(angle) - translatedPoint.y * Math.sin(angle),
            translatedPoint.x * Math.sin(angle) + translatedPoint.y * Math.cos(angle)
        );

        return rotatedPoint.add(center);
    }

    function checkCollision(circle: Particle, rectangle: Block): boolean {
        const rotatedCircleCenter: Vector2 = rotatePoint(
            circle.position,
            rectangle.position,
            -rectangle.rotationDegrees * (Math.PI / 180)
        );

        const hw: number = rectangle.width / 2;
        const hh: number = rectangle.height / 2;

        if (
            Math.abs(rotatedCircleCenter.x - rectangle.position.x) <= hw + circle.radius &&
            Math.abs(rotatedCircleCenter.y - rectangle.position.y) <= hh + circle.radius
        ) {
            return true;
        }

        return false;
    }

    function handleBlockCollision(circle: Particle, rectangle: Block): void {
        const rotatedCircleCenter: Vector2 = rotatePoint(
            circle.position,
            rectangle.position,
            -rectangle.rotationDegrees // TODO: pi?
        );

        const hw: number = rectangle.width / 2;
        const hh: number = rectangle.height / 2;

        // Find the point of contact on the rectangle
        let closestPoint = new Vector2(
            Math.max(
                rectangle.position.x - hw,
                Math.min(rotatedCircleCenter.x, rectangle.position.x + hw)
            ),
            Math.max(
                rectangle.position.y - hh,
                Math.min(rotatedCircleCenter.y, rectangle.position.y + hh)
            )
        );

        // Calculate the collision normal vector
        const collisionNormal = rotatedCircleCenter.subtract(closestPoint).normalize();

        // TODO: there is a bug, if the particle scrapes the corner of the block, the collision normal is calculated for the wrong side of the rectangle

        // Reflect the velocity vector of the circle around the collision normal vector
        const dotProduct: number =
            circle.velocity.x * collisionNormal.x + circle.velocity.y * collisionNormal.y;

        const reflection = circle.velocity.subtract(collisionNormal.multiply(2 * dotProduct));

        // Apply coefficient of restitution
        reflection.x *= COEFFICIENT_OF_RESTITUTION;
        reflection.y *= COEFFICIENT_OF_RESTITUTION;

        // Update the circle's velocity
        circle.velocity = reflection;
    }

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            // NOTE: the fade-in-on-scroll is really important because without it the startAnimationEvent won't be called for this canvas
            className="fade-in-on-scroll h-full w-full bg-slate-300"
        />
    );
}
