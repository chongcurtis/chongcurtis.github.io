import { Body } from "../the-dark-forest/Body";
import NBodySimulationCanvas from "../the-dark-forest/NBodySimulationCanvas";

export const HundredsOfCatalysts = () => {
    const ELECTRON_COLOR = "#05dfeb";
    const ELECTRON_RADIUS = 0.3;

    enum Group {
        IRON = 0,
        LITHIUM = 1,
        BORON = 2,
    }

    const catalysts = [
        new Body(10000, 300, 200, 0, 0, 2, "#fc6b4e", Group.IRON),
        new Body(50, 290, 205, 0.02, 0.015, ELECTRON_RADIUS, ELECTRON_COLOR, Group.IRON),
        new Body(50, 310, 215, -0.005, 0.01, ELECTRON_RADIUS, ELECTRON_COLOR, Group.IRON),
        new Body(50, 305, 195, -0.015, 0.01, ELECTRON_RADIUS, ELECTRON_COLOR, Group.IRON),

        new Body(10000, 200, 100, 0, 0, 5, "#f09cff", Group.LITHIUM),
        new Body(50, 180, 110, 0.02, 0.02, ELECTRON_RADIUS, ELECTRON_COLOR, Group.LITHIUM),
        new Body(50, 210, 120, -0.02, 0.02, ELECTRON_RADIUS, ELECTRON_COLOR, Group.LITHIUM),
        new Body(50, 210, 90, -0.02, 0.01, ELECTRON_RADIUS, ELECTRON_COLOR, Group.LITHIUM),
        new Body(50, 205, 115, -0.02, 0.02, ELECTRON_RADIUS, ELECTRON_COLOR, Group.LITHIUM),
        new Body(50, 215, 105, -0.01, 0.03, ELECTRON_RADIUS, ELECTRON_COLOR, Group.LITHIUM),

        new Body(10000, 400, 130, 0, 0, 3, "#8bfca3", Group.BORON),
        new Body(50, 400, 150, 0.6, 0, ELECTRON_RADIUS, ELECTRON_COLOR, Group.BORON),
    ];
    return (
        <div className="mt-10">
            <NBodySimulationCanvas bodies={catalysts} canvasWidth={500} canvasHeight={250} />
        </div>
    );
};
