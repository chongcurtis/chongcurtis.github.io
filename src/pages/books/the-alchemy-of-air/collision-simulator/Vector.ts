export default class Vector {
    constructor(public x: number, public y: number) {}

    subtract(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    scale(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }
}
