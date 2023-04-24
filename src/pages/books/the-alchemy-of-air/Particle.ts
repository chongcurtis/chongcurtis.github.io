//particle class with position, velocity, acceleration, and lifespan
import Vector2 from "@/pages/books/the-alchemy-of-air/Vector2";

export class Particle {
    mass: number;
    position: Vector2;
    velocity: Vector2;
    acceleration: Vector2; // the acceleration determines how much a particle is pulled in a direction
    // I don't expect acceleration to change over time
    radius: number;
    color: string;
    timeToLive: number;

    constructor(
        m: number,
        x: number,
        y: number,
        vx: number,
        vy: number,
        ax: number,
        ay: number,
        r: number,
        color: string,
        timeToLive: number // the number of simulation steps before the particle dies
    ) {
        this.mass = m;
        this.position = new Vector2(x, y);
        this.velocity = new Vector2(vx, vy);
        this.acceleration = new Vector2(ax, ay);
        this.radius = r;
        this.color = color;
        this.timeToLive = timeToLive;
    }

    x() {
        return this.position.x;
    }

    y() {
        return this.position.y;
    }

    simulate() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }
}
