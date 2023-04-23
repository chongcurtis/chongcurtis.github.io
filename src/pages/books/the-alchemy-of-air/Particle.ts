//particle class with position, velocity, acceleration, and lifespan
import Vector2 from "@/pages/books/the-alchemy-of-air/Vector2";

export class Particle {
    m: number;
    pos: Vector2;
    v: Vector2;
    a: Vector2; // the acceleration determines how much a particle is pulled in a direction
    // I don't expect acceleration to change over time
    r: number;
    color: string;

    constructor(
        m: number,
        x: number,
        y: number,
        vx: number,
        vy: number,
        ax: number,
        ay: number,
        r: number,
        color: string
    ) {
        this.m = m;
        this.pos = new Vector2(x, y);
        this.v = new Vector2(vx, vy);
        this.a = new Vector2(ax, ay);
        this.r = r;
        this.color = color;
    }

    x() {
        return this.pos.x;
    }

    y() {
        return this.pos.y;
    }

    simulate() {
        this.v.add(this.a);
        this.pos.add(this.v);
    }
}
