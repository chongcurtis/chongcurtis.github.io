import { Body } from "./Body";

const SUN_COLOR = "#ff8c7d";
const SUN_R = 5;

export const ThreeBodySystem = [
    new Body(100000, 250, 250, 0, 0, SUN_R + 10, SUN_COLOR),
    new Body(100, 280, 250, 0, 0, 2, "#78faff"),
    new Body(100, 400, 250, 0, 0, 6, "#fa438c"),
];

export const ManyBodySystem = [
    new Body(1000, 300, 200, 0.4, -0.04, SUN_R, SUN_COLOR),
    new Body(1000, 250, 270, -0.1, -0.04, SUN_R, SUN_COLOR),
    new Body(1000, 100, 220, 0, -0.04, SUN_R, SUN_COLOR),
    new Body(1000, 350, 200, -0.3, 0.12, SUN_R, SUN_COLOR),
    new Body(100, 250, 250, 0, -0.1, 2, "#f25eff"),
    new Body(300, 150, 120, 0, 0, 2, "#322bff"),
    new Body(100, 250, 100, 0, 1, 2, "#20d49b"),
];

export const BinaryStarSystem = [
    new Body(10, 220, 220, -2, 2, SUN_R, SUN_COLOR),
    new Body(10, 280, 280, 2, -2, SUN_R, SUN_COLOR),
    new Body(1, 250, 250, 0, 0, 2, "#78faff"),
];
