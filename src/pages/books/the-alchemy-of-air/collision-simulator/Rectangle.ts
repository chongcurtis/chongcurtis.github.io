import Vector from "@/pages/books/the-alchemy-of-air/collision-simulator/Vector";
import Circle from "@/pages/books/the-alchemy-of-air/collision-simulator/Circle";

export default class Rectangle {
    constructor(
        public center: Vector,
        public width: number,
        public height: number,
        public angle: number,
        public velocity: Vector
    ) {}

    rotatePoint(point: Vector): Vector {
        const s = Math.sin(this.angle);
        const c = Math.cos(this.angle);

        // translate point back to origin:
        point.x -= this.center.x;
        point.y -= this.center.y;

        // rotate point
        const xnew = point.x * c - point.y * s;
        const ynew = point.x * s + point.y * c;

        // translate point back:
        point.x = xnew + this.center.x;
        point.y = ynew + this.center.y;
        return point;
    }

    closestPointTo(circle: Circle): Vector {
        const localCircleCenter = this.rotatePoint(circle.center);

        let x: number, y: number;

        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;

        if (localCircleCenter.x < -halfWidth) {
            x = -halfWidth;
        } else if (localCircleCenter.x > halfWidth) {
            x = halfWidth;
        } else {
            x = localCircleCenter.x;
        }

        if (localCircleCenter.y < -halfHeight) {
            y = -halfHeight;
        } else if (localCircleCenter.y > halfHeight) {
            y = halfHeight;
        } else {
            y = localCircleCenter.y;
        }

        return new Vector(this.center.x + x, this.center.y + y);
    }

    // Call this function every frame to move the rectangle
    updatePosition(timeStep: number): void {
        this.center = this.center.add(this.velocity.scale(timeStep));
    }
}
