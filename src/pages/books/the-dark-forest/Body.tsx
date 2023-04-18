export class Body {
    m: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    ax: number = 0;
    ay: number = 0;
    r: number;
    color: string;

    constructor(m: number, x: number, y: number, vx: number, vy: number, r: number, color: string) {
        this.m = m;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.r = r;
        this.color = color;
    }
}
