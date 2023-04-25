import React from "react";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import Vector2 from "@/pages/books/the-alchemy-of-air/Vector2";
import Fluid, { U_FIELD, V_FIELD } from "@/pages/books/the-alchemy-of-air/fluid-simulator/Fluid";

type Props = {
    blocks: React.MutableRefObject<Block[]>;
    canvasWidth: number;
    canvasHeight: number;
};
export default function FluidSimulationCanvas({
    particles,
    blocks,
    canvasWidth,
    canvasHeight,
}: Props) {
    const SIMULATION_SPEED = 100; // 40ms between each frame = 25fps

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const sceneRef = React.useRef<any>({
        gravity: -9.81,
        dt: 1.0 / 120.0,
        numIters: 100,
        frameNr: 0,
        overRelaxation: 1.9,
        obstacleX: 0.0,
        obstacleY: 0.0,
        obstacleRadius: 0.05,
        paused: false,
        sceneNr: 0,
        showObstacle: false,
        showStreamlines: false,
        showVelocities: false,
        showPressure: false,
        showSmoke: true,
        fluid: null,
    });

    const cellScale = 5;
    const simHeight = 5;
    const cellSize = 1;
    // const simHeight = 1

    // TODO: the simWidth determines the number of cells. I think this value is wrong
    const cScale = canvasHeight / simHeight;
    const simWidth = canvasWidth / cScale;

    function cX(x) {
        return x * cScale;
    }

    function cY(y) {
        return canvasHeight - y * cScale;
    }

    React.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        // console.log("useEffect canvas");

        const canvas = canvasRef.current;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const ctx = setupCanvas(canvas);
        // setInterval(function () {
        //     run(canvas, ctx);
        // }, SIMULATION_SPEED); //this is the cyclea
        const scene = sceneRef.current;

        function simulate() {
            if (!scene.paused) {
                scene.fluid.simulate(scene.dt, scene.gravity, scene.numIters);
            }
            scene.frameNr++;
        }

        function update() {
            simulate();
            draw();
            requestAnimationFrame(update);
        }

        setupScene(1);
        update();

        ctx.font = "30px Arial";
    }, [canvasRef]);

    function setupScene(sceneNr = 0) {
        const scene = sceneRef.current;
        scene.sceneNr = sceneNr;
        scene.obstacleRadius = 0.15;
        scene.overRelaxation = 1.9;

        scene.dt = 1.0 / 60.0;
        scene.numIters = 40;

        let res = 100;

        if (sceneNr == 0) {
            res = 50;
        } else if (sceneNr == 3) {
            res = 200;
        }

        const domainHeight = 1.0;
        const domainWidth = (domainHeight / simHeight) * simWidth;
        const h = domainHeight / res;

        const numX = Math.floor(canvasWidth / cellScale); //Math.floor(domainWidth / h) + 50;
        const numY = Math.floor(canvasHeight / cellScale); //Math.floor(domainHeight / h) + 50;

        const density = 1000.0;

        const f = (scene.fluid = new Fluid(density, numX, numY, h));

        const n = f.numY;

        if (sceneNr == 0) {
            // tank

            for (let i = 0; i < f.numX; i++) {
                for (let j = 0; j < f.numY; j++) {
                    let s = 1.0; // fluid
                    if (i == 0 || i == f.numX - 1 || j == 0) {
                        s = 0.0; // solid
                    }
                    f.s[i * n + j] = s;
                }
            }
            scene.gravity = -9.81;
            scene.showPressure = true;
            scene.showSmoke = false;
            scene.showStreamlines = false;
            scene.showVelocities = false;
        } else if (sceneNr == 1 || sceneNr == 3) {
            // vortex shedding

            const inVel = 2.0;
            for (let i = 0; i < f.numX; i++) {
                for (let j = 0; j < f.numY; j++) {
                    let s = 1.0; // fluid
                    if (i == 0 || j == 0 || j == f.numY - 1) {
                        s = 0.0; // solid
                    }
                    f.s[i * n + j] = s;

                    if (i == 1) {
                        f.u[i * n + j] = inVel;
                    }
                }
            }

            const pipeH = 0.1 * f.numY;
            const minJ = Math.floor(0.5 * f.numY - 0.5 * pipeH);
            const maxJ = Math.floor(0.5 * f.numY + 0.5 * pipeH);

            for (let j = minJ; j < maxJ; j++) {
                f.m[j] = 0.0;
            }

            setObstacle(0.5, 0.5, true);

            scene.gravity = 0.0;
            scene.showPressure = false;
            scene.showSmoke = true;
            scene.showStreamlines = false;
            scene.showVelocities = false;

            if (sceneNr == 3) {
                scene.dt = 1.0 / 120.0;
                scene.numIters = 100;
                scene.showPressure = true;
            }
        } else if (sceneNr == 2) {
            // paint

            scene.gravity = 0.0;
            scene.overRelaxation = 1.0;
            scene.showPressure = false;
            scene.showSmoke = true;
            scene.showStreamlines = false;
            scene.showVelocities = false;
            scene.obstacleRadius = 0.1;
        }

        // document.getElementById("streamButton").checked = scene.showStreamlines;
        // document.getElementById("velocityButton").checked = scene.showVelocities;
        // document.getElementById("pressureButton").checked = scene.showPressure;
        // document.getElementById("smokeButton").checked = scene.showSmoke;
        // document.getElementById("overrelaxButton").checked = scene.overRelaxation > 1.0;
    }

    function setupCanvas(canvas: HTMLCanvasElement) {
        // Fixes the DPI of the canvas
        const dpr = window.devicePixelRatio || 1;
        // console.log(dpr);
        // canvas.width = canvas.width * dpr;
        // canvas.height = canvas.height * dpr;
        canvas.width = canvas.width * dpr;
        canvas.height = canvas.height * dpr;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(dpr, dpr);
        return ctx;
    }

    // draw -------------------------------------------------------

    // this function isn't called
    // function setColor(r, g, b) {
    //     c.fillStyle = `rgb(
    // 		${Math.floor(255 * r)},
    // 		${Math.floor(255 * g)},
    // 		${Math.floor(255 * b)})`;
    //     c.strokeStyle = `rgb(
    // 		${Math.floor(255 * r)},
    // 		${Math.floor(255 * g)},
    // 		${Math.floor(255 * b)})`;
    // }

    function getSciColor(val, minVal, maxVal) {
        val = Math.min(Math.max(val, minVal), maxVal - 0.0001);
        const d = maxVal - minVal;
        val = d == 0.0 ? 0.5 : (val - minVal) / d;
        const m = 0.25;
        const num = Math.floor(val / m);
        const s = (val - num * m) / m;
        let r, g, b;

        switch (num) {
            case 0:
                r = 0.0;
                g = s;
                b = 1.0;
                break;
            case 1:
                r = 0.0;
                g = 1.0;
                b = 1.0 - s;
                break;
            case 2:
                r = s;
                g = 1.0;
                b = 0.0;
                break;
            case 3:
                r = 1.0;
                g = 1.0 - s;
                b = 0.0;
                break;
        }

        return [255 * r, 255 * g, 255 * b, 255];
    }

    function draw() {
        if (!canvasRef.current) {
            return;
        }
        const scene = sceneRef.current;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#FF0000";
        const f = scene.fluid;
        const n = f.numY;

        const h = f.h;

        let minP = f.p[0];
        let maxP = f.p[0];

        for (let i = 0; i < f.numCells; i++) {
            minP = Math.min(minP, f.p[i]);
            maxP = Math.max(maxP, f.p[i]);
        }

        // let imgData = c.getImageData(0, 0, canvas.width, canvas.height);

        let color = [255, 255, 255, 255];

        for (let i = 0; i < f.numX; i++) {
            for (let j = 0; j < f.numY; j++) {
                if (scene.showPressure) {
                    const p = f.p[i * n + j];
                    const s = f.m[i * n + j];
                    color = getSciColor(p, minP, maxP);
                    if (scene.showSmoke) {
                        color[0] = Math.max(0.0, color[0] - 255 * s);
                        color[1] = Math.max(0.0, color[1] - 255 * s);
                        color[2] = Math.max(0.0, color[2] - 255 * s);
                    }
                } else if (scene.showSmoke) {
                    const s = f.m[i * n + j];
                    color[0] = 255 * s;
                    color[1] = 255 * s;
                    color[2] = 255 * s;
                    if (scene.sceneNr == 2) color = getSciColor(s, 0.0, 1.0);
                } else if (f.s[i * n + j] === 0.0) {
                    // color[0] = 0;
                    // color[1] = 0;
                    // color[2] = 0;
                    // no need to waste CPU cycles drawing nothing
                    continue;
                }

                const x = Math.floor(cX(i * h));
                const y = Math.floor(cY((j + 1) * h));
                const cx = Math.floor(cScale * cellScale * h) + 1;
                const cy = Math.floor(cScale * cellScale * h) + 1;

                const r = color[0];
                const g = color[1];
                const b = color[2];

                ctx.fillStyle = `rgb(${r},${g},${b})`; // set the fill color
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize); // draw the rectangle centered on the origin
                // for (let yi = y; yi < y + cy; yi++) {
                //     let p = 4 * (yi * canvas.width + x);
                //
                //     for (let xi = 0; xi < cx; xi++) {
                //         // imgData.data[p++] = r;
                //         // imgData.data[p++] = g;
                //         // imgData.data[p++] = b;
                //         // imgData.data[p++] = 255;
                //         ctx.fillStyle = `rgb(${r},${g},${b})`; // set the fill color
                //         ctx.fillRect(x, y, cellSize, cellSize); // draw the rectangle centered on the origin
                //     }
                // }
            }
        }

        // c.putImageData(imgData, 0, 0);

        if (scene.showVelocities) {
            ctx.strokeStyle = "#000000";
            const scale = 0.02;

            for (let i = 0; i < f.numX; i++) {
                for (let j = 0; j < f.numY; j++) {
                    const u = f.u[i * n + j];
                    const v = f.v[i * n + j];

                    ctx.beginPath();

                    const x0 = cX(i * h);
                    const x1 = cX(i * h + u * scale);
                    const y = cY((j + 0.5) * h);

                    ctx.moveTo(x0, y);
                    ctx.lineTo(x1, y);
                    ctx.stroke();

                    const x = cX((i + 0.5) * h);
                    const y0 = cY(j * h);
                    const y1 = cY(j * h + v * scale);

                    ctx.beginPath();
                    ctx.moveTo(x, y0);
                    ctx.lineTo(x, y1);
                    ctx.stroke();
                }
            }
        }

        if (scene.showStreamlines) {
            const segLen = f.h * 0.2;
            const numSegs = 15;

            ctx.strokeStyle = "#000000";

            for (let i = 1; i < f.numX - 1; i += 5) {
                for (let j = 1; j < f.numY - 1; j += 5) {
                    let x = (i + 0.5) * f.h;
                    let y = (j + 0.5) * f.h;

                    ctx.beginPath();
                    ctx.moveTo(cX(x), cY(y));

                    for (let n = 0; n < numSegs; n++) {
                        const u = f.sampleField(x, y, U_FIELD);
                        const v = f.sampleField(x, y, V_FIELD);
                        const l = Math.sqrt(u * u + v * v);
                        // x += u/l * segLen;
                        // y += v/l * segLen;
                        x += u * 0.01;
                        y += v * 0.01;
                        if (x > f.numX * f.h) break;

                        ctx.lineTo(cX(x), cY(y));
                    }
                    ctx.stroke();
                }
            }
        }

        if (scene.showObstacle) {
            // not sure why this statement is randomly here. so I commented it out
            // c.strokeW;
            const r = scene.obstacleRadius + f.h;
            if (scene.showPressure) {
                ctx.fillStyle = "#000000";
            } else {
                ctx.fillStyle = "#DDDDDD";
            }
            ctx.beginPath();
            ctx.arc(cX(scene.obstacleX), cY(scene.obstacleY), cScale * r, 0.0, 2.0 * Math.PI);
            ctx.closePath();
            ctx.fill();

            ctx.lineWidth = 3.0;
            ctx.strokeStyle = "#000000";
            ctx.beginPath();
            ctx.arc(cX(scene.obstacleX), cY(scene.obstacleY), cScale * r, 0.0, 2.0 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.lineWidth = 1.0;
        }

        if (scene.showPressure) {
            const s = "pressure: " + minP.toFixed(0) + " - " + maxP.toFixed(0) + " N/m";
            ctx.fillStyle = "#000000";
            ctx.font = "16px Arial";
            ctx.fillText(s, 10, 35);
        }
    }

    function setObstacle(x, y, reset) {
        let vx = 0.0;
        let vy = 0.0;
        const scene = sceneRef.current;

        if (!reset) {
            vx = (x - scene.obstacleX) / scene.dt;
            vy = (y - scene.obstacleY) / scene.dt;
        }

        scene.obstacleX = x;
        scene.obstacleY = y;
        const r = scene.obstacleRadius;
        const f = scene.fluid;
        const n = f.numY;
        // const cd = Math.sqrt(2) * f.h;

        for (let i = 1; i < f.numX - 2; i++) {
            for (let j = 1; j < f.numY - 2; j++) {
                f.s[i * n + j] = 1.0;

                const dx = (i + 0.5) * f.h - x;
                const dy = (j + 0.5) * f.h - y;

                if (dx * dx + dy * dy < r * r) {
                    f.s[i * n + j] = 0.0;
                    if (scene.sceneNr == 2)
                        f.m[i * n + j] = 0.5 + 0.5 * Math.sin(0.1 * scene.frameNr);
                    else f.m[i * n + j] = 1.0;
                    f.u[i * n + j] = vx;
                    f.u[(i + 1) * n + j] = vx;
                    f.v[i * n + j] = vy;
                    f.v[i * n + j + 1] = vy;
                }
            }
        }

        // TODO
        // scene.showObstacle = true;
        scene.showObstacle = false;
    }

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            // NOTE: the fade-in-on-scroll is really important because without it the startAnimationEvent won't be called for this canvas
            className="fade-in-on-scroll h-full w-full bg-background-color"
        />
    );
}
