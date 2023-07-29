import { Body } from "../the-dark-forest/Body";
import NBodySimulationCanvas from "../the-dark-forest/NBodySimulationCanvas";

export const HundredsOfCatalysts = () => {
    const NUCLEUS_COLOR = "#fc6b4e";
    const NUCLEUS_RADIUS = 5;
    const ELECTRON_COLOR = "#05dfeb";
    const ELECTRON_RADIUS = 1;

    const catalysts = [
        new Body(1000, 300, 200, 0, 0, NUCLEUS_RADIUS, NUCLEUS_COLOR),
        new Body(50, 280, 210, 0.04, 0.03, ELECTRON_RADIUS, ELECTRON_COLOR),
        new Body(50, 320, 230, -0.04, 0.04, ELECTRON_RADIUS, ELECTRON_COLOR),
        new Body(30, 310, 190, -0.04, 0.04, ELECTRON_RADIUS, ELECTRON_COLOR),

        new Body(1000, 100, 0, 0, 0, NUCLEUS_RADIUS, NUCLEUS_COLOR),
        new Body(50, 80, 10, 0.04, 0.03, ELECTRON_RADIUS, ELECTRON_COLOR),
        new Body(50, 120, 30, -0.04, 0.04, ELECTRON_RADIUS, ELECTRON_COLOR),
        new Body(30, 110, 90, -0.04, 0.04, ELECTRON_RADIUS, ELECTRON_COLOR),
    ];
    return (
        <div className="mt-10">
            <NBodySimulationCanvas bodies={catalysts} canvasWidth={500} canvasHeight={250} />;
        </div>
    );
};
