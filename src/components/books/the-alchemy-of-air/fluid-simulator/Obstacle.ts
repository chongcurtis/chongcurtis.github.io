import { ZeroToOne } from "@/common/types/ZeroToOne";

export class Obstacle {
    x: ZeroToOne; // ZeroToOne is a percentage of the canvas' width/height
    y: ZeroToOne;
    radius: ZeroToOne;

    constructor(x: ZeroToOne, y: ZeroToOne, radius: ZeroToOne) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}
