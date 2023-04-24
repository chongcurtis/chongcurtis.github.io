export class Block {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    rotationDegrees: number;

    constructor(
        x: number,
        y: number,
        w: number,
        h: number,
        color: string,
        rotationDegrees: number
    ) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.color = color;
        this.rotationDegrees = rotationDegrees;
    }
}
