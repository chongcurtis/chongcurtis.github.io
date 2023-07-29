import React from "react";
import Circle from "@/components/books/the-alchemy-of-air/collision-simulator/Circle";
import Rectangle from "@/components/books/the-alchemy-of-air/collision-simulator/Rectangle";
import cloneDeep from "lodash.clonedeep";
import Vector from "@/components/books/the-alchemy-of-air/collision-simulator/Vector";

type Props = {
    circles: Circle[];
    rectangles: Rectangle[];
    canvasWidth: number;
    canvasHeight: number;
    startAnimation: boolean;
};
export default function CollisionSimulatorCanvas({
    circles: initialCircles,
    rectangles: initialRectangles,
    canvasWidth,
    canvasHeight,
    startAnimation,
}: Props) {
    const circles = React.useRef<Circle[]>(cloneDeep(initialCircles));
    const rectangles = React.useRef<Rectangle[]>(cloneDeep(initialRectangles));

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const SIMULATION_SPEED = 100; // 40ms between each frame = 25fps
    const timeStep = 0.1;

    // React.useEffect(() => {
    // }, [obstacles]);

    React.useEffect(() => {
        if (!canvasRef.current || !startAnimation) {
            return;
        }
        // console.log("useEffect canvas");

        const canvas = canvasRef.current;
        // canvas.width = canvasWidth * 0.5;
        // canvas.height = canvasHeight * 0.5;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = setupCanvas(canvas);
        setInterval(function () {
            simulate();
        }, SIMULATION_SPEED); //this is the cyclea

        ctx.font = "30px Arial";
    }, [startAnimation]);

    const simulate = () => {
        for (const circle of circles.current) {
            circle.updatePosition(timeStep);
        }
        for (const rectangle of rectangles.current) {
            rectangle.updatePosition(timeStep);
        }
        for (const circle of circles.current) {
            for (const rectangle of rectangles.current) {
                checkCollision(circle, rectangle);
            }
        }
    };

    function checkCollision(circle: Circle, rectangle: Rectangle): boolean {
        const closestPoint = rectangle.closestPointTo(circle);
        if (circle.containsPoint(closestPoint)) {
            // If collision is detected, invert the circle's velocity
            circle.velocity = new Vector(-circle.velocity.x, -circle.velocity.y);
            return true;
        }
        return false;
    }

    function setupCanvas(canvas: HTMLCanvasElement) {
        // Fixes the DPI of the canvas
        const dpr = window.devicePixelRatio || 1;
        // console.log(dpr);
        // canvas.width = canvas.width * dpr;
        // canvas.height = canvas.height * dpr;
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        // TODO: test to see if willReadFrequently results in faster renders
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
        ctx.scale(dpr, dpr);
        return ctx;
    }

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            className="fade-in-on-scroll animation-delay-200 h-full w-full"
            // NOTE: the fade-in-on-scroll is really important because without it the startAnimationEvent won't be called for this canvas
        />
    );
}
