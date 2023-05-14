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
        this.x += v.x * s;
        this.y += v.y * s;
        return this;
    }

    addVectors(a: Vector2, b: Vector2): Vector2 {
        this.x = a.x + b.x;
        this.y = a.y + b.y;
        return this;
    }

    subtract(v: Vector2, s: number = 1.0): Vector2 {
        this.x -= v.x * s;
        this.y -= v.y * s;
        return this;
    }

    subtractVectors(a: Vector2, b: Vector2): Vector2 {
        this.x = a.x - b.x;
        this.y = a.y - b.y;
        return this;
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
}
