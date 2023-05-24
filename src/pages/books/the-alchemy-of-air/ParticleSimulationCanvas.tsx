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
                // handleBlockCollision(p1, block);
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

    function intersectsCircleAndRotatedRectangle(circle: Particle, rectangle: Block) {
        const cx = rectangle.position.x + rectangle.width / 2;
        const cy = rectangle.position.y + rectangle.height / 2;
        const distX = Math.abs(circle.x - cx);
        const distY = Math.abs(circle.y - cy);
        const rectHalfWidth = rectangle.width / 2;
        const rectHalfHeight = rectangle.height / 2;

        // Calculate angle of the rectangle in radians
        const angleRad = rectangle.rotationDegrees * (Math.PI / 180);

        // Calculate coordinates of the corners after rotation
        const sinAngle = Math.sin(angleRad);
        const cosAngle = Math.cos(angleRad);
        const topLeftX = -rectHalfWidth * cosAngle - rectHalfHeight * sinAngle + cx;
        const topLeftY = -rectHalfWidth * sinAngle + rectHalfHeight * cosAngle + cy;
        const topRightX = rectHalfWidth * cosAngle - rectHalfHeight * sinAngle + cx;
        const topRightY = rectHalfWidth * sinAngle + rectHalfHeight * cosAngle + cy;
        const bottomLeftX = -rectHalfWidth * cosAngle + rectHalfHeight * sinAngle + cx;
        const bottomLeftY = -rectHalfWidth * sinAngle - rectHalfHeight * cosAngle + cy;
        const bottomRightX = rectHalfWidth * cosAngle + rectHalfHeight * sinAngle + cx;
        const bottomRightY = rectHalfWidth * sinAngle - rectHalfHeight * cosAngle + cy;

        if (distX > rectHalfWidth + circle.radius || distY > rectHalfHeight + circle.radius) {
            return false;
        }

        if (distX <= rectHalfWidth || distY <= rectHalfHeight) {
            return true;
        }

        const cornerDistanceSq =
            Math.pow(topLeftX - circle.x, 2) + Math.pow(topLeftY - circle.y, 2) <=
                Math.pow(circle.radius, 2) ||
            Math.pow(topRightX - circle.x, 2) + Math.pow(topRightY - circle.y, 2) <=
                Math.pow(circle.radius, 2) ||
            Math.pow(bottomLeftX - circle.x, 2) + Math.pow(bottomLeftY - circle.y, 2) <=
                Math.pow(circle.radius, 2) ||
            Math.pow(bottomRightX - circle.x, 2) + Math.pow(bottomRightY - circle.y, 2) <=
                Math.pow(circle.radius, 2);

        return cornerDistanceSq;
    }

    function handleBlockCollision(p: Particle, b: Block) {
        const relativePosition = p.position.subtract(b.position);

        const inverseRotationMatrix: number[][] = [
            [Math.cos(-b.rotationDegrees), -Math.sin(-b.rotationDegrees)],
            [Math.sin(-b.rotationDegrees), Math.cos(-b.rotationDegrees)],
        ];

        const rotatedPosition = new Vector2(
            relativePosition.x * inverseRotationMatrix[0][0] +
                relativePosition.y * inverseRotationMatrix[0][1],
            relativePosition.x * inverseRotationMatrix[1][0] +
                relativePosition.y * inverseRotationMatrix[1][1]
        );

        // Step 5: Determine closest point on the rectangle
        const clampedPosition = new Vector2(
            Math.max(-1, Math.min(rotatedPosition.x / (b.width / 2), 1)),
            Math.max(-1, Math.min(rotatedPosition.y / (b.height / 2), 1))
        );

        // Step 6: Calculate closest point on the rectangle
        const closestPoint = new Vector2(
            clampedPosition.x * (b.width / 2),
            clampedPosition.y * (b.height / 2)
        );

        // Step 7: Calculate normal vector
        const normalVector = p.position.subtract(closestPoint);

        const magnitude: number = Math.sqrt(normalVector.x ** 2 + normalVector.y ** 2);
        const normalizedNormalVector = normalVector.normalize();
        console.log(normalizedNormalVector);
    }

    function projectPolygon(vertices: Vector2[], axis: Vector2) {
        let min = axis.dotProduct(vertices[0]);
        let max = min;

        for (let i = 1; i < vertices.length; i++) {
            const p = axis.dotProduct(vertices[i]);

            if (p < min) {
                min = p;
            } else if (p > max) {
                max = p;
            }
        }

        return { min, max };
    }

    // function handleBlockCollision(block: Block, particle: Particle) {
    //     // Treat the particle as a square for SAT
    //     const particleAsBlock = new Block(
    //         particle.position.x - particle.radius,
    //         particle.position.y - particle.radius,
    //         particle.radius * 2,
    //         particle.radius * 2,
    //         particle.color,
    //         0 // no rotation
    //     );
    //
    //     const axes1 = block.getAxes();
    //     // console.log(axes1);
    //     const axes2 = particleAsBlock.getAxes();
    //
    //     let minOverlap = Infinity;
    //     let collisionAxis: Vector2 | null = null;
    //
    //     // Test all axes
    //     for (let i = 0; i < axes1.length; i++) {
    //         const axis = axes1[i];
    //
    //         const projection1 = projectPolygon(block.getVertices(), axis);
    //         const projection2 = projectPolygon(particleAsBlock.getVertices(), axis);
    //
    //         const overlap =
    //             Math.min(projection1.max, projection2.max) -
    //             Math.max(projection1.min, projection2.min);
    //
    //         if (overlap < 0) {
    //             return false; // No collision
    //         }
    //
    //         if (overlap < minOverlap) {
    //             minOverlap = overlap;
    //             collisionAxis = axis;
    //         }
    //     }
    //
    //     for (let i = 0; i < axes2.length; i++) {
    //         const axis = axes2[i];
    //
    //         const projection1 = projectPolygon(block.getVertices(), axis);
    //         const projection2 = projectPolygon(particleAsBlock.getVertices(), axis);
    //
    //         const overlap =
    //             Math.min(projection1.max, projection2.max) -
    //             Math.max(projection1.min, projection2.min);
    //
    //         if (overlap < 0) {
    //             return false; // No collision
    //         }
    //
    //         if (overlap < minOverlap) {
    //             minOverlap = overlap;
    //             collisionAxis = axis;
    //         }
    //     }
    //
    //     // Collision detected - compute new velocity
    //     if (collisionAxis) {
    //         debugger;
    //         const v = particle.velocity;
    //         const d = 2 * v.dotProduct(collisionAxis);
    //         particle.velocity = new Vector2(v.x - d * collisionAxis.x, v.y - d * collisionAxis.y);
    //     }
    //
    //     return true;
    // }

    // function overlap(p1, p2) {
    //     if (p1.min > p2.max || p2.min > p1.max) {
    //         return false;
    //     }
    //     return true;
    // }

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            // NOTE: the fade-in-on-scroll is really important because without it the startAnimationEvent won't be called for this canvas
            className="fade-in-on-scroll h-full w-full bg-slate-300"
        />
    );
}
