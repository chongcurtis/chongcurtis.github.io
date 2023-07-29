import Vector from "@/components/books/the-alchemy-of-air/collision-simulator/Vector";

export default class Circle {
    constructor(public center: Vector, public radius: number, public velocity: Vector) {}

    containsPoint(point: Vector): boolean {
        const difference = this.center.subtract(point);
        return difference.length() <= this.radius;
    }

    // Call this function every frame to move the circle
    updatePosition(timeStep: number): void {
        this.center = this.center.add(this.velocity.scale(timeStep));
    }
}
