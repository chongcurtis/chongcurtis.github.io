import Vector2 from "@/pages/books/the-alchemy-of-air/Vector2";

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

    getVertices() {
        const halfWidth = this.width / 2;
        const halfHeight = this.height / 2;

        const rad = (this.rotationDegrees * Math.PI) / 180;

        const cos = Math.cos(rad);
        const sin = Math.sin(rad);

        return [
            new Vector2(
                this.x + cos * -halfWidth - sin * -halfHeight,
                this.y + sin * -halfWidth + cos * -halfHeight
            ),
            new Vector2(
                this.x + cos * halfWidth - sin * -halfHeight,
                this.y + sin * halfWidth + cos * -halfHeight
            ),
            new Vector2(
                this.x + cos * halfWidth - sin * halfHeight,
                this.y + sin * halfWidth + cos * halfHeight
            ),
            new Vector2(
                this.x + cos * -halfWidth - sin * halfHeight,
                this.y + sin * -halfWidth + cos * halfHeight
            ),
        ];
    }

    getAxes() {
        const vertices = this.getVertices();
        const axes = [];

        for (let i = 0; i < vertices.length; i++) {
            const p1 = vertices[i];
            const p2 = vertices[i + 1 == vertices.length ? 0 : i + 1];

            const edge = p1.subtract(p2);

            axes.push(edge.getPerpendicular());
        }

        return axes;
    }
}
