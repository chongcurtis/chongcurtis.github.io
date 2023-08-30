import React from "react";
import { Block } from "@/components/books/the-alchemy-of-air/Block";
import { Particle } from "@/components/books/the-alchemy-of-air/Particle";
import Vector2 from "@/components/books/the-alchemy-of-air/Vector2";
import { AnimationState } from "@/common/animations";

type Props = {
    animationState: AnimationState;
    particles: React.MutableRefObject<Particle[]>;
    blocks: Block[];
    canvasWidth: number;
    canvasHeight: number;
    isCollisionEnabled: boolean;
    extraClassNames?: string;
};
export default function ParticleSimulationCanvas({
    animationState,
    particles,
    blocks,
    canvasWidth,
    canvasHeight,
    isCollisionEnabled,
    extraClassNames,
}: Props) {
    const SIMULATION_SPEED = 35; // 40ms between each frame = 25fps

    const COEFFICIENT_OF_RESTITUTION = 1; // the ratio of the final to initial relative speed between two objects after they collide.
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const timeoutId = React.useRef<NodeJS.Timeout>(); // controls the setInterval that runs the canvas animation
    const canvasCtx = React.useRef<CanvasRenderingContext2D>();

    React.useEffect(() => {
        const canvas = canvasRef.current!;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = setupCanvas(canvas);
        ctx.font = "30px Arial";
        canvasCtx.current = ctx;

        // I opted for a setInterval solution since requestAnimationFrame was causing the simulation to run too fast
        // const update = () => {
        //     run(canvas, ctx);
        //     requestAnimationFrame(update); // Schedule next frame
        // };
        // requestAnimationFrame(update);
    }, [canvasWidth, canvasHeight]);

    React.useEffect(() => {
        if (
            !canvasRef.current ||
            !canvasCtx.current ||
            animationState === AnimationState.BEFORE_START
        ) {
            return;
        }
        if (animationState === AnimationState.PAUSED) {
            clearInterval(timeoutId.current!);
            return;
        }
        const canvas = canvasRef.current!;
        const ctx = canvasCtx.current!;

        timeoutId.current = setInterval(function () {
            run(canvas, ctx);
        }, SIMULATION_SPEED); //this is the cycle
    }, [animationState, canvasHeight, canvasWidth]);

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
            ctx.fillStyle = block.color; // set the fill color

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
        // console.log("canvas running");
        if (!particles.current) {
            return;
        }

        let canvasW = canvas.width;
        let canvasH = canvas.height;

        particles.current = particles.current.filter(isParticleAlive);
        // console.log(particles.current);

        const filteredIndexes: number[] = [];
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
        particles.current = particles.current.filter(
            (_, index) => !filteredIndexes.includes(index)
        );

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

    // limits value to the range [min, max]
    function clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(value, max));
    }

    // how this method works:
    // to know the velocity of the ball after it bounces off, we just need to know the normal vector of the ball when
    // it collides with the rectangle, then just subtract it's velocity by TWICE the normal vector
    //
    // the tricky part is calculating the normal vector since the rectangle is rotated
    // this approach is really bad because it's verbose, but what it does is:
    // 1) rotate the ball, so it is rotated in the same way as the rectangle
    // 2) use the clamp function to determine the closest point (on the surface) the ball is to the rectangle
    // - note: there is an edge case where the ball moves so fast, it's inside the rectangle, but we handle this case
    // 3) calculate the normal vector by subtracting the closest point from the center of the ball
    // 4) After we calculate the normal vector, we need to rotate it back, so it's relative to the ball's original rotation (not rotated at all)
    // 5) finally, with the normal vector in the right rotation direction, we can calculate the new velocity by dot-producting the normal vector with the ball's velocity
    //
    // I think we can simplify this logic (without the whole rotation business) by using trig to find the normal vector
    // however, we still need to know the closest surface location the ball collides with the rectalbe, so I'm not sure if the logic to handle this edge case is any simpler
    function handleBlockCollision(circle: Particle, rectangle: Block): void {
        const rotatedCircleCenter: Vector2 = rotatePoint(
            circle.position,
            rectangle.position,
            -rectangle.rotationDegrees * (Math.PI / 180)
        );

        const hw: number = rectangle.width / 2;
        const hh: number = rectangle.height / 2;

        // Find the point of contact on the rectangle
        // NOTE: if the center of the circle is INSIDE the rectangle this returns the center, which breaks calculations
        // the normal vector has magnitude 0
        let closestPoint = new Vector2(
            clamp(rotatedCircleCenter.x, rectangle.position.x - hw, rectangle.position.x + hw),
            clamp(rotatedCircleCenter.y, rectangle.position.y - hh, rectangle.position.y + hh)
        );
        const collisionDistanceVector = rotatedCircleCenter.subtract(closestPoint);

        // Calculate the collision normal vector
        let collisionNormal;
        if (collisionDistanceVector.length() > 0) {
            collisionNormal = collisionDistanceVector.normalize();
        } else {
            // the circle is either inside the rectangle or on the border, we
            // assume that the normal vector is the closest distance between the point and one of the borders of the rectangle
            // we need to do this, cause otherwise, we can't properly calculate a normal vector
            const closestX =
                rectangle.position.x + (rotatedCircleCenter.x > rectangle.position.x ? hw : -hw);
            const closestY =
                rectangle.position.y + (rotatedCircleCenter.y > rectangle.position.y ? hh : -hh);

            let rectangleSurface;
            if (
                Math.abs(rotatedCircleCenter.x - closestX) <
                Math.abs(rotatedCircleCenter.y - closestY)
            ) {
                // if the circle is closer to the x-edge than the y-edge, the x-edge is the closest
                // the normal is thus, 90 degrees against this edge
                const normalDirection = rotatedCircleCenter.x < rectangle.position.x ? -1 : 1;
                collisionNormal = new Vector2(1 * normalDirection, 0);
                rectangleSurface = new Vector2(closestX, rotatedCircleCenter.y);
            } else {
                const normalDirection = rotatedCircleCenter.y < rectangle.position.y ? -1 : 1;
                collisionNormal = new Vector2(0, 1 * normalDirection);
                rectangleSurface = new Vector2(rotatedCircleCenter.x, closestY);
            }

            // put the circle on the edge of the rectangle, so we don't stay inside the rectangle in the next frame
            // To verify that we are setting the circle's position on the right side of the rectangle,
            // multiply the radius by 4, and you'll see that the circles ends up on the correct side (the side it came from)
            const newCirclePosition = rectangleSurface.add(collisionNormal.multiply(circle.radius));
            // now we rotate the point back in the circle's coordinate system
            circle.position = rotatePoint(
                newCirclePosition,
                rectangle.position,
                rectangle.rotationDegrees * (Math.PI / 180)
            );
        }
        // console.log(collisionNormal);
        // TODO: there is a bug, if the particle scrapes the corner of the block, the collision normal is calculated for the wrong side of the rectangle

        // I changed how we update the collisionnormal because I think that we need to put the velocity vector back in the frame of reference of the rotated rectangle's degree
        collisionNormal = rotatePoint(
            collisionNormal,
            new Vector2(0, 0),
            rectangle.rotationDegrees * (Math.PI / 180)
        );

        // Reflect the velocity vector of the circle around the collision normal vector
        const dotProduct: number = circle.velocity.dot(collisionNormal);

        const reflection = circle.velocity.subtract(collisionNormal.multiply(2 * dotProduct));

        // console.log(
        //     reflection,
        //     circle.velocity,
        //     collisionNormal,
        //     dotProduct,
        //     rotatedCircleCenter,
        //     closestPoint
        // );

        reflection.x *= COEFFICIENT_OF_RESTITUTION;
        reflection.y *= COEFFICIENT_OF_RESTITUTION;

        // circle.position = closestPoint.add(collisionNormal.multiply(circle.radius));
        // Update the circle's velocity
        circle.velocity = reflection;
    }

    const defaultClassNames = "fade-in-on-scroll relative z-10 h-full w-full bg-background-color";
    const classNames = extraClassNames
        ? `${defaultClassNames} ${extraClassNames}`
        : defaultClassNames;
    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            // NOTE: the fade-in-on-scroll is really important because without it the startAnimationEvent won't be called for this canvas
            className={classNames}
        />
    );
}
