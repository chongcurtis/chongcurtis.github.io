import React from "react";
import { Block } from "@/pages/books/the-alchemy-of-air/Block";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";
import Vector2 from "@/pages/books/the-alchemy-of-air/Vector2";
import Fluid, { U_FIELD, V_FIELD } from "@/pages/books/the-alchemy-of-air/fluid-simulator/Fluid";
import { Obstacle } from "@/pages/books/the-alchemy-of-air/fluid-simulator/Obstacle";

type Props = {
    obstacles: Obstacle[];
    canvasWidth: number;
    canvasHeight: number;
};
export default function FluidSimulationCanvas({ obstacles, canvasWidth, canvasHeight }: Props) {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const sceneRef = React.useRef<any>({
        gravity: -9.81,
        dt: 1.0 / 120.0,
        numIters: 100,
        frameNr: 0,
        overRelaxation: 1.9,
        obstacleX: 0.0,
        obstacleY: 0.0,
        obstacleRadius: 0.15,
        paused: false,
        sceneNr: 0,
        showObstacle: false,
        showStreamlines: false,
        showVelocities: false,
        showPressure: false,
        showSmoke: true,
        fluid: null,
    });

    // If the pixel is greater than this threshold, do not draw it (to save computation)a
    // 1 means: do draw every pixel regardless of color
    const PIXEL_THRESHOLD = 0.85;

    const simHeight = 1.1;
    const cScale = canvasHeight / simHeight;
    const simWidth = canvasWidth / cScale;

    function cX(x) {
        return x * cScale;
    }

    function cY(y) {
        return canvasHeight - y * cScale;
    }

    React.useEffect(() => {
        for (const obstacle of obstacles) {
            setObstacle(obstacle, true);
        }
    }, [obstacles]);

    React.useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        // console.log("useEffect canvas");

        const canvas = canvasRef.current;
        // canvas.width = canvasWidth * 0.5;
        // canvas.height = canvasHeight * 0.5;
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

        var res = 100;

        if (sceneNr == 0) res = 50;
        else if (sceneNr == 3) res = 200;

        var domainHeight = 1.0;
        var domainWidth = (domainHeight / simHeight) * simWidth;
        var h = domainHeight / res;

        var numX = Math.floor(domainWidth / h);
        var numY = Math.floor(domainHeight / h);

        var density = 1000.0;

        const f = (scene.fluid = new Fluid(density, numX, numY, h));

        var n = f.numY;

        if (sceneNr == 0) {
            // tank

            for (var i = 0; i < f.numX; i++) {
                for (var j = 0; j < f.numY; j++) {
                    var s = 1.0; // fluid
                    if (i == 0 || i == f.numX - 1 || j == 0) s = 0.0; // solid
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

            var inVel = 2.0;
            for (var i = 0; i < f.numX; i++) {
                for (var j = 0; j < f.numY; j++) {
                    var s = 1.0; // fluid
                    if (i == 0 || j == 0 || j == f.numY - 1) s = 0.0; // solid
                    f.s[i * n + j] = s;

                    if (i == 1) {
                        f.u[i * n + j] = inVel;
                    }
                }
            }

            var pipeH = 0.1 * f.numY;
            var minJ = Math.floor(0.5 * f.numY - 0.5 * pipeH);
            var maxJ = Math.floor(0.5 * f.numY + 0.5 * pipeH);

            for (var j = minJ; j < maxJ; j++) f.m[j] = 0.0;

            if (obstacles) {
                for (const obstacle of obstacles) {
                    setObstacle(obstacle, true);
                }
            }

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
        canvas.width = canvas.width;
        canvas.height = canvas.height;
        // TODO: test to see if willReadFrequently results in faster renders
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
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
        var d = maxVal - minVal;
        val = d == 0.0 ? 0.5 : (val - minVal) / d;
        var m = 0.25;
        var num = Math.floor(val / m);
        var s = (val - num * m) / m;
        var r, g, b;

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
        var c = canvas.getContext("2d");

        c.clearRect(0, 0, canvas.width, canvas.height);

        c.fillStyle = "#FF0000";
        const f = scene.fluid;
        n = f.numY;

        var cellScale = 1.1;

        var h = f.h;

        let minP = f.p[0];
        let maxP = f.p[0];

        for (var i = 0; i < f.numCells; i++) {
            minP = Math.min(minP, f.p[i]);
            maxP = Math.max(maxP, f.p[i]);
        }

        let id = c.getImageData(0, 0, canvas.width, canvas.height);

        var color = [255, 255, 255, 255];

        for (var i = 0; i < f.numX; i++) {
            for (var j = 0; j < f.numY; j++) {
                if (scene.showPressure) {
                    var p = f.p[i * n + j];
                    var s = f.m[i * n + j];
                    color = getSciColor(p, minP, maxP);
                    if (scene.showSmoke) {
                        color[0] = Math.max(0.0, color[0] - 255 * s);
                        color[1] = Math.max(0.0, color[1] - 255 * s);
                        color[2] = Math.max(0.0, color[2] - 255 * s);
                    }
                } else if (scene.showSmoke) {
                    const s = f.m[i * n + j];
                    if (s > PIXEL_THRESHOLD) {
                        // this is an optimization to improve the frame rate
                        continue;
                    }
                    color[0] = 255 * s * 1.2;
                    color[1] = 255 * s * 1.2;
                    color[2] = 255 * s * 1.2;
                    if (scene.sceneNr == 2) color = getSciColor(s, 0.0, 1.0);
                } else if (f.s[i * n + j] == 0.0) {
                    color[0] = 0;
                    color[1] = 0;
                    color[2] = 0;
                }

                var x = Math.floor(cX(i * h));
                var y = Math.floor(cY((j + 1) * h));
                var cx = Math.floor(cScale * cellScale * h) + 1;
                var cy = Math.floor(cScale * cellScale * h) + 1;

                // There is an issue where the canvas isn't big enough to fit all the pixels,
                // so we will draw the pixels onto the next line. This catch makes sure we don't draw those overflowed pixels
                if (x + cx >= canvas.width) {
                    continue;
                }

                const r = color[0];
                const g = color[1];
                const b = color[2];

                for (var yi = y; yi < y + cy; yi++) {
                    var p = 4 * (yi * canvas.width + x);

                    for (var xi = 0; xi < cx; xi++) {
                        id.data[p++] = r;
                        id.data[p++] = g;
                        id.data[p++] = b;
                        id.data[p++] = 255;
                    }
                }
            }
        }

        c.putImageData(id, 0, 0);

        if (scene.showVelocities) {
            c.strokeStyle = "#000000";
            const scale = 0.02;

            for (var i = 0; i < f.numX; i++) {
                for (var j = 0; j < f.numY; j++) {
                    var u = f.u[i * n + j];
                    var v = f.v[i * n + j];

                    c.beginPath();

                    const x0 = cX(i * h);
                    const x1 = cX(i * h + u * scale);
                    y = cY((j + 0.5) * h);

                    c.moveTo(x0, y);
                    c.lineTo(x1, y);
                    c.stroke();

                    x = cX((i + 0.5) * h);
                    const y0 = cY(j * h);
                    const y1 = cY(j * h + v * scale);

                    c.beginPath();
                    c.moveTo(x, y0);
                    c.lineTo(x, y1);
                    c.stroke();
                }
            }
        }

        if (scene.showStreamlines) {
            var segLen = f.h * 0.2;
            var numSegs = 15;

            c.strokeStyle = "#000000";

            for (var i = 1; i < f.numX - 1; i += 5) {
                for (var j = 1; j < f.numY - 1; j += 5) {
                    var x = (i + 0.5) * f.h;
                    var y = (j + 0.5) * f.h;

                    c.beginPath();
                    c.moveTo(cX(x), cY(y));

                    for (var n = 0; n < numSegs; n++) {
                        var u = f.sampleField(x, y, U_FIELD);
                        var v = f.sampleField(x, y, V_FIELD);
                        const l = Math.sqrt(u * u + v * v);
                        // x += u/l * segLen;
                        // y += v/l * segLen;
                        x += u * 0.01;
                        y += v * 0.01;
                        if (x > f.numX * f.h) break;

                        c.lineTo(cX(x), cY(y));
                    }
                    c.stroke();
                }
            }
        }

        if (scene.showObstacle) {
            // not sure why this statement is randomly here. so I commented it out
            // c.strokeW;
            const r = scene.obstacleRadius + f.h;
            if (scene.showPressure) {
                c.fillStyle = "#000000";
            } else {
                c.fillStyle = "#DDDDDD";
            }
            c.beginPath();
            c.arc(cX(scene.obstacleX), cY(scene.obstacleY), cScale * r, 0.0, 2.0 * Math.PI);
            c.closePath();
            c.fill();

            c.lineWidth = 3.0;
            c.strokeStyle = "#000000";
            c.beginPath();
            c.arc(cX(scene.obstacleX), cY(scene.obstacleY), cScale * r, 0.0, 2.0 * Math.PI);
            c.closePath();
            c.stroke();
            c.lineWidth = 1.0;
        }

        if (scene.showPressure) {
            var s = "pressure: " + minP.toFixed(0) + " - " + maxP.toFixed(0) + " N/m";
            c.fillStyle = "#000000";
            c.font = "16px Arial";
            c.fillText(s, 10, 35);
        }
    }

    function setObstacle(obstacle: Obstacle, reset) {
        const x = obstacle.x;
        const y = obstacle.y;
        const r = obstacle.radius;
        var vx = 0.0;
        var vy = 0.0;
        const scene = sceneRef.current;

        if (!reset) {
            vx = (x - scene.obstacleX) / scene.dt;
            vy = (y - scene.obstacleY) / scene.dt;
        }

        scene.obstacleX = x;
        scene.obstacleY = y;
        var f = scene.fluid;
        if (!f) {
            // the fluid hasn't been initalized yet
            return;
        }
        var n = f.numY;
        // var cd = Math.sqrt(2) * f.h;

        for (var i = 1; i < f.numX - 2; i++) {
            for (var j = 1; j < f.numY - 2; j++) {
                f.s[i * n + j] = 1.0;

                const dx = (i + 0.5) * f.h - x;
                const dy = (j + 0.5) * f.h - y;

                if (dx * dx + dy * dy < r * r) {
                    f.s[i * n + j] = 0.0;
                    if (scene.sceneNr == 2) {
                        f.m[i * n + j] = 0.5 + 0.5 * Math.sin(0.1 * scene.frameNr);
                    } else {
                        f.m[i * n + j] = 1.0;
                    }
                    f.u[i * n + j] = vx;
                    f.u[(i + 1) * n + j] = vx;
                    f.v[i * n + j] = vy;
                    f.v[i * n + j + 1] = vy;
                }
            }
        }

        scene.showObstacle = false;
    }

    return (
        <canvas
            id="canvas"
            ref={canvasRef}
            className="h-full w-full "
            // NOTE: the fade-in-on-scroll is really important because without it the startAnimationEvent won't be called for this canvas
        />
    );
}
