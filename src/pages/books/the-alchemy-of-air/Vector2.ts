// from https://github.com/matthias-research/pages/blob/master/tenMinutePhysics/03-billiard.html

// The "2" in Vector2 means that this is a 2D vector.
export default class Vector2 {
    x: number;
    y: number;

    constructor(x: number = 0.0, y: number = 0.0) {
        this.x = x;
        this.y = y;
    }

    set(v: Vector2) {
        this.x = v.x;
        this.y = v.y;
    }

    clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    add(v: Vector2, s: number = 1.0): Vector2 {
        return new Vector2(this.x + v.x * s, this.y + v.y * s);
    }

    addVectors(a: Vector2, b: Vector2): Vector2 {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }

    subtract(v: Vector2, s: number = 1.0): Vector2 {
        return new Vector2(this.x - v.x * s, this.y - v.y * s);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    scale(s: number) {
        this.x *= s;
        this.y *= s;
    }

    dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    dotProduct(other: Vector2) {
        return this.x * other.x + this.y * other.y;
    }

    getPerpendicular() {
        return new Vector2(this.y, -this.x);
    }

    normalize(): Vector2 {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        const normalizedX = this.x / length;
        const normalizedY = this.y / length;
        return new Vector2(normalizedX, normalizedY);
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    multiply(factor: number): Vector2 {
        const scaledX = this.x * factor;
        const scaledY = this.y * factor;
        return new Vector2(scaledX, scaledY);
    }

    rotate(angle: number): Vector2 {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rotatedX = this.x * cos - this.y * sin;
        const rotatedY = this.x * sin + this.y * cos;
        return new Vector2(rotatedX, rotatedY);
    }

    project(other: Vector2): Vector2 {
        const dotProduct = this.x * other.x + this.y * other.y;
        const otherMagnitudeSquared = other.x * other.x + other.y * other.y;
        const scalar = dotProduct / otherMagnitudeSquared;
        const projectedX = scalar * other.x;
        const projectedY = scalar * other.y;
        return new Vector2(projectedX, projectedY);
    }
}
