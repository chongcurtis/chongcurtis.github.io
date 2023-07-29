import Vector2 from "@/components/books/the-alchemy-of-air/Vector2";

export class Block {
    position: Vector2; // the (x,y) coord is the center of the block
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
        this.position = new Vector2(x, y);
        this.width = w;
        this.height = h;
        this.color = color;
        this.rotationDegrees = rotationDegrees;
    }

    setPosition(x: number, y: number) {
        this.position = new Vector2(x, y);
    }

    changePosition(dx: number, dy: number) {
        this.setPosition(this.position.x + dx, this.position.y + dy);
    }
}
