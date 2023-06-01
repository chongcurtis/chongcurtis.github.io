import React from "react";
import { initAnimations } from "@/common/animations";
import Boiler from "@/pages/books/the-alchemy-of-air/Boiler";
import AlchemyOfAirTitle from "@/pages/books/the-alchemy-of-air/AlchemyOfAirTitle";
import BulletsStrikeSand from "@/pages/books/the-alchemy-of-air/BulletsStrikeSand";

export default function TheAlchemyOfAir() {
    React.useEffect(() => {
        return initAnimations();
    }, []);

    return (
        <>
            <div className="mt-20" />
            <AlchemyOfAirTitle />
            <p className="fade-in-on-scroll animation-delay-2000 text-md mt-20">
                Credit for this animation goes to{" "}
                <a
                    href="https://github.com/matthias-research/pages/blob/master/tenMinutePhysics/17-fluidSim.html"
                    target="_blank"
                    className="underline-on-scroll animation-delay-200 after:bg-sleepover-secondary"
                >
                    Matthias Müller
                </a>
            </p>
            <p className="fade-in-on-scroll animation-delay-1500 mt-20 text-xl">
                It's 1890 when Crookes pulled the fire alarm.
            </p>
            <Boiler />
            <BulletsStrikeSand />
            {/*</div>*/}
            <br />
            <p className="fade-in-on-scroll text-xl">
                "England and all civilized nations, stand in peril."
            </p>
            <br />
            <p className="fade-in-on-scroll text-xl">"As mouths multiply, food sources dwindle"</p>
            <p>"There was only one answer: The creation of vast amount of fertilizer"</p>
            <p>"It is the chemist who must come to the rescue"</p>
            <p>Enter fritz Haber. A German, and a chemist still looking for his Nobel prize.</p>
            <p>He labours </p>
            <p className="fade-in-on-scroll">
                This book changed my life because it taught me that humanity has solved
                calamity-scale problems before. It make me much more optimistic in technology that
                can save the world. We've done it before.
            </p>
            <p>
                What else did these Nobel laureates do? More alchemy of course. You can feel it in
                the air.
            </p>
            <div className="mb-40" />;
        </>
    );
}
