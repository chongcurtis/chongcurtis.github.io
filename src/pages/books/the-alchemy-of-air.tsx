import React from "react";
import { initAnimations } from "@/common/animations";
import ExponentialCount from "@/pages/books/the-alchemy-of-air/ExponentialCount";
import AlchemyOfAirTitle from "@/pages/books/the-alchemy-of-air/AlchemyOfAirTitle";
import sirWilliamCrookes from "public/books/the-alchemy-of-air/Sir_William_Crookes_1906.jpg";
import FixNitrogen from "@/pages/books/the-alchemy-of-air/FixNitrogen";
import IncreaseHeat from "@/pages/books/the-alchemy-of-air/IncreaseHeat";
import IncreasePressure from "@/pages/books/the-alchemy-of-air/IncreasePressure";

export default function TheAlchemyOfAir() {
    React.useEffect(() => {
        return initAnimations();
    }, []);

    return (
        <>
            <div className="mt-20" />
            <AlchemyOfAirTitle />
            <p className="fade-in-on-scroll animation-delay-2000 text-md mb-32 mt-10">
                Credit for this animation goes to{" "}
                <a
                    href="https://github.com/matthias-research/pages/blob/master/tenMinutePhysics/17-fluidSim.html"
                    target="_blank"
                    className="underline-on-scroll animation-delay-200 after:bg-sleepover-secondary"
                >
                    Matthias Müller
                </a>
            </p>
            <p className="fade-in-on-scroll mt-20 text-2xl">1898</p>
            <div className="mt-20 flex flex-row">
                <div className="fade-in-on-scroll animation-delay-1500 flex flex-col justify-center align-middle">
                    <p className="fade-in-on-scroll mt-8 text-lg">
                        "England and all civilized nations, stand in deadly peril of not having
                        enough to eat."
                    </p>
                </div>
                <img
                    className="fade-in-on-scroll m-5 max-w-sm p-20"
                    src={sirWilliamCrookes.src}
                    alt="Sir William Crookes"
                />
            </div>
            <p className="fade-in-on-scroll mt-10 text-lg">
                All 1000 people in the auditorium muted to hear the 66-year-old Crookes commence his
                inauguration speech. {/*at the Academy of Sciences.*/}
            </p>
            <p className="fade-in-on-scroll mt-10 text-lg">
                "I must ask you to bear with me for 10 minutes, for I am afraid what I now have to
                say will prove somewhat dull."
            </p>
            {/*https://www.jstor.org/stable/1627238?seq=2*/}
            <p className="fade-in-on-scroll mt-10 text-lg">
                Even if all arable land is cultivated, and crops are optimally rotated, and meat
                withdraws from our diet...
            </p>
            <p className="fade-in-on-scroll mt-10 text-lg">
                "Our wheat-producing soil is totally unequal to the strain put upon it."
            </p>
            <p className="fade-in-on-scroll mb-20 mt-10 text-lg">
                {" "}
                To meet this deficit, England will have to import grain
            </p>
            <p className="fade-in-on-scroll mb-40 mt-10 text-lg">However...</p>
            <p className="fade-in-on-scroll mb-10 text-lg">
                Austro-Hungary will not have surplus wheat{" "}
            </p>
            <p className="fade-in-on-scroll mb-10 text-lg"> Canada will not have surplus wheat</p>
            <p className="fade-in-on-scroll mb-10 text-lg"> Russia will not have surplus wheat</p>
            <p className="fade-in-on-scroll mb-10 text-lg"> America will not have surplus wheat</p>
            {/*<p className="fade-in-on-scroll mb-10 text-lg">And if there's a war, imports will...</p>*/}
            <p className="fade-in-on-scroll mb-20 mt-20 text-lg">
                England will{" "}
                <span className="underline-on-scroll animation-delay-200 after:bg-red-400">
                    starve
                </span>{" "}
                in 33 years.
            </p>
            <p className="fade-in-on-scroll mt-10 text-lg">Tense silence suffocates the room</p>
            <p className="fade-in-on-scroll mt-10 text-lg">
                "Wheat preeminently demands nitrogen, fixed in the form of ammonia"
            </p>
            <p className="fade-in-on-scroll mt-10 text-lg">
                "We must then rely on nitrogenous manures to increase the fertility of land under
                wheat, so as to raise the yield from the world's low average - 12.7 bushels per acre
                - to a higher average".
            </p>
            <p className="fade-in-on-scroll mt-10 text-lg">
                Yet "for years we have been expending fixed nitrogen at a culpably extravagant
                rate".
            </p>
            <p className="fade-in-on-scroll mt-10 text-lg">
                At present, England's fertilizer is imported from the Chilean desert. But it will
                soon empty.
            </p>
            <p className="fade-in-on-scroll mt-10 text-lg">
                Fortunately, "nitrogen is one of the most abundant and pervading bodies on the face
                of the earth".
            </p>
            <p className="fade-in-on-scroll mb-10 mt-10 text-lg">
                But to turn N&#8322; into fertilizer, you must break nature's strongest molecular
                bond.
            </p>
            <FixNitrogen />
            <p className="fade-in-on-scroll animation-delay-3000 mb-40 text-lg">
                But this has never been accomplished.
            </p>
            <p className="fade-in-on-scroll animation-delay-1000 mt-10 text-lg">
                "There is a gleam of light out of this darkness of despondency. [...] Before we are
                in the grip of actual dearth, the chemist will step in and postpone the day of
                famine".
            </p>
            <p className="fade-in-on-scroll mt-10 text-lg">
                This was Brook's challenge: To fix nitrogen, and save mankind.
            </p>
            <p className="fade-in-on-scroll mb-40 mt-10 text-lg">
                His address was sensational. Newspapers printed it around the world.
            </p>
            <p className="fade-in-on-scroll mb-60 text-2xl">The race to fix nitrogen had begun.</p>
            <div className="fade-in-on-scroll mb-60 flex flex-row justify-center text-lg">
                <ExponentialCount startingNumber={100} endingNumber={31} exponentialAmount={0.95} />
                <p>Years until Famine </p>
            </div>
            <p className="fade-in-on-scroll mb-40 text-2xl">1895 Germany</p>
            <p className="fade-in-on-scroll text-lg">
                Enter Fritz Haber. A German, and a chemist still hunting for his Nobel prize
            </p>
            <p className="fade-in-on-scroll mt-40 text-lg">
                Unlike most scientists who fixed nitrogen by replicating nature's approach{" "}
            </p>
            <p className="fade-in-on-scroll text-lg">
                Haber manufactured it in a vessel. By increasing the temperature, and pressure of
                air, he calculated that it's possible to break the N&#8322; bond.
            </p>
            <p className="fade-in-on-scroll text-lg">So he turned up the heat.</p>
            <IncreaseHeat />
            <p className="fade-in-on-scroll text-lg">
                And crammed Nitrogen into a density no lighter than a Neutron star
            </p>
            <IncreasePressure />
            {/*<p className="fade-in-on-scroll text-lg">*/}
            {/*    All he needed was some funding. So he turned to BASF.*/}
            {/*</p>*/}
            {/*<p className="fade-in-on-scroll mt-40 text-lg">23 years until famine - 1908</p>*/}
            {/*<Boiler />*/}
            {/*<BulletsStrikeSand />*/}
            {/*</div>*/}
            <br />
            <br />
            <p>Enter fritz Haber. A German, and a chemist still seeking for his Nobel prize.</p>
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
