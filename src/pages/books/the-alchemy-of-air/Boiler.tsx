import ParticleSimulationCanvas from "@/pages/books/the-alchemy-of-air/ParticleSimulationCanvas";
import { Particle } from "@/pages/books/the-alchemy-of-air/Particle";

export default function Boiler() {
    return (
        <div>
            <ParticleSimulationCanvas
                particles={[new Particle(100, 100, 10, 10, 10, 0, 0, 5, "red")]}
                surfaces={[]}
                canvasWidth={500}
                canvasHeight={500}
            />
        </div>
    );
}
