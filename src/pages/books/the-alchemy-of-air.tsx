import React from "react";
import { initAnimations, NARRATIVE_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";
import ExponentialCount from "@/pages/books/the-alchemy-of-air/ExponentialCount";
import AlchemyOfAirTitle from "@/pages/books/the-alchemy-of-air/AlchemyOfAirTitle";
import sirWilliamCrookes from "public/books/the-alchemy-of-air/Sir_William_Crookes_1906.jpg";
import FixNitrogen from "@/pages/books/the-alchemy-of-air/FixNitrogen";
import IncreaseHeat from "@/pages/books/the-alchemy-of-air/IncreaseHeat";
import IncreasePressure from "@/pages/books/the-alchemy-of-air/IncreasePressure";
import CultivateAllArableLand from "@/pages/books/the-alchemy-of-air/CultivateAllArableLand";
import OptimallyRotateCrops from "@/pages/books/the-alchemy-of-air/OptimallyRotateCrops";
import IncreaseFertilityOfLand from "@/pages/books/the-alchemy-of-air/IncreaseFertilityOfLand";

export default function TheAlchemyOfAir() {
    React.useEffect(() => {
        return initAnimations(NARRATIVE_ANIMATION_TRIGGER_DECIMAL);
    }, []);

    return (
        <div className="px-3 text-center text-lg">
            <div className="mt-20" />
            <div className="m-auto items-center">
                <AlchemyOfAirTitle />
            </div>
            {/* rational for the delay: 2000 ms for fluid to appear, 300ms for buffer*/}
            <p className="fade-in-on-scroll animation-delay-2300 text-md mb-32 mt-10">
                Credit for this animation goes to{" "}
                <a
                    href="https://github.com/matthias-research/pages/blob/master/tenMinutePhysics/17-fluidSim.html"
                    target="_blank"
                    className="underline-on-scroll animation-delay-200 after:bg-sleepover-secondary"
                >
                    Matthias Müller
                </a>
            </p>
            <p className="fade-in-on-scroll mt-20 text-2xl">England 1898</p>
            <div className="mt-20 flex flex-row flex-wrap items-center md:flex-nowrap">
                <div className="fade-in-on-scroll max-w-sm p-20 md:m-5">
                    <img src={sirWilliamCrookes.src} alt="Sir William Crookes" />
                </div>
                <div className="fade-in-on-scroll animation-delay-1500">
                    <p>
                        "England and all civilized nations stand in deadly peril of not having
                        enough to eat."
                    </p>
                </div>
            </div>
            <p className="fade-in-on-scroll mt-10 ">
                All 1000 people in the auditorium muted to hear the 66-year-old Crookes commence his
                inauguration speech. {/*at the Academy of Sciences.*/}
            </p>
            {/*<p className="fade-in-on-scroll mt-10 ">*/}
            {/*    "I must ask you to bear with me for 10 minutes, for I am afraid what I now have to*/}
            {/*    say will prove somewhat dull."*/}
            {/*</p>*/}
            <p className="fade-in-on-scroll mt-10 ">"As mouths multiply, food sources dwindle"</p>
            {/*https://www.jstor.org/stable/1627238?seq=2*/}
            <p className="fade-in-on-scroll mt-10 ">Even if we:</p>
            <p className="fade-in-on-scroll mb-10 mt-10">cultivate all arable land</p>
            <CultivateAllArableLand />
            <p className="fade-in-on-scroll mb-20 mt-10">and optimally rotate crops</p>
            <OptimallyRotateCrops />
            <p className="fade-in-on-scroll mt-10 ">
                "Our wheat-producing soil is totally unequal to the strain put upon it."
            </p>
            <p className="fade-in-on-scroll mt-50 mb-50 ">
                To meet this deficit, England will have to import grain from abroad
            </p>
            <p className="fade-in-on-scroll mb-40 mt-10 ">However...</p>
            <p className="fade-in-on-scroll mb-10 ">Austro-Hungary population will also increase</p>
            <p className="fade-in-on-scroll mb-10 "> Canada as well</p>
            <p className="fade-in-on-scroll mb-10 "> Russia as well</p>
            <p className="fade-in-on-scroll mb-32 "> America as well</p>
            {/*<p className="fade-in-on-scroll mb-10 ">And if there's a war, imports will...</p>*/}
            <p className="fade-in-on-scroll mb-40 mt-40 text-2xl">
                England will{" "}
                <span className="underline-on-scroll animation-delay-200 after:bg-red-400">
                    starve
                </span>{" "}
                in 33 years.
            </p>
            <p className="fade-in-on-scroll mt-10 ">Tense silence suffocates the room</p>
            <p className="fade-in-on-scroll mt-10 ">
                "Wheat preeminently demands nitrogen, fixed in the form of ammonia"
            </p>
            <p className="fade-in-on-scroll mt-10 ">
                "We must then rely on nitrogenous manures to increase the fertility of land under
                wheat"
            </p>
            <IncreaseFertilityOfLand />
            {/*"We must then rely on nitrogenous manures to increase the fertility of land under*/}
            {/*wheat, so as to raise the yield from the world's low average - 12.7 bushels per acre*/}
            {/*- to a higher average".*/}
            <p className="fade-in-on-scroll mt-10 ">
                Yet "for years we have been expending fixed nitrogen at a culpably extravagant
                rate".
            </p>
            <p className="fade-in-on-scroll mt-10 ">
                At present, England's fertilizer is imported from the Chilean desert. But it will
                soon empty.
            </p>
            <p className="fade-in-on-scroll mt-10 ">
                Fortunately, "nitrogen is one of the most abundant and pervading bodies on the face
                of the earth".
            </p>
            {/*I'm not sure if heres the catch is better than "But"*/}
            <p className="fade-in-on-scroll mb-10 mt-10 ">
                Here's the catch: To turn N&#8322; into fertilizer, you must break nature's
                strongest molecular bond.
            </p>
            <FixNitrogen />
            <p className="fade-in-on-scroll mb-40 ">But this has never been done.</p>
            <p className="fade-in-on-scroll mt-10 ">
                "There is a gleam of light out of this darkness of despondency. [...] Before we are
                in the grip of actual dearth, the chemist will step in and postpone the day of
                famine".
            </p>
            <p className="fade-in-on-scroll mb-32 mt-20">This was Brook's challenge:</p>
            <p className="fade-in-on-scroll mb-20 mt-10 text-2xl ">
                To fix nitrogen, and save mankind.
            </p>
            {/*<p className="fade-in-on-scroll mt-10 ">*/}
            {/*    His address was sensational. Newspapers printed it around the world.*/}
            {/*</p>*/}
            <p className="fade-in-on-scroll mb-20 text-xl">
                Newspapers printed his address around the world
            </p>
            <p className="fade-in-on-scroll text-xl">The race was on.</p>
            {/* The address says that the world should run out of food by 1931*/}
            {/*https://en.wikipedia.org/wiki/Birkeland%E2%80%93Eyde_process*/}
            {/*This process was made in 1903: 28 years left*/}
            <div className="fade-in-on-scroll mb-60 mt-40 flex flex-row justify-center text-2xl">
                <div className="flex-row">
                    <ExponentialCount
                        startingNumber={100}
                        endingNumber={28}
                        exponentialAmount={0.95}
                        startingWaitDuration={150}
                        startingRedness={0}
                    />
                    <p className="mt-1">Years until famine </p>
                </div>
            </div>
            <p className="fade-in-on-scroll mb-40 mt-20 text-2xl">1903 Norway</p>
            <p className="fade-in-on-scroll mb-10 mt-10 ">
                Birkeland and Eyde creates artificial lightning, splitting N&#8322; for the first
                time.
            </p>
            <p className="fade-in-on-scroll mb-10 mt-10 ">
                It takes 15 MWh To produce a ton of fixed nitrogen (nitric acid).
            </p>
            {/*https://www.bing.com/search?q=10*1000+kwh+to+mwh&qs=n&form=QBRE&sp=-1&ghc=2&lq=0&pq=10*1000+kwh+to+mwh&sc=7-18&sk=&cvid=A25F9A80B2A448D98B96FAB5EDD5E887&ghsh=0&ghacc=0&ghpl=*/}
            {/*https://arena.gov.au/projects/hydrogen-to-ammonia/*/}
            <p className="fade-in-on-scroll mb-10 mt-10 ">But the process was:</p>
            <p className="fade-in-on-scroll mb-10 mt-10 ">Prohibitively expensive</p>
            <p className="fade-in-on-scroll mb-10 mt-10 ">Corrosive</p>
            <p className="fade-in-on-scroll mb-10 mt-10 ">So hot it fried the machine</p>
            {/*<div className="fade-in-on-scroll">*/}
            {/*    <div*/}
            {/*        className="mt-20 text-9xl"*/}
            {/*        style={{*/}
            {/*            color: `rgb(220, 0, 0)`,*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        27*/}
            {/*    </div>*/}
            {/*    <p className=" mt-1">Years until Famine </p>*/}
            {/*</div>*/}
            <div className="fade-in-on-scroll">
                <div
                    className="mt-20 text-9xl "
                    style={{
                        color: `rgb(130, 0, 0)`,
                    }}
                >
                    26
                </div>
                <p className="mt-1 text-2xl">Years until famine</p>
            </div>
            <p className="fade-in-on-scroll mb-10 mt-20 text-2xl">1905 Germany</p>
            <p className="fade-in-on-scroll mb-10 mt-10">
                Enter fritz Haber. A German jew, and a chemist still seeking for his Nobel prize.
            </p>
            <p className="fade-in-on-scroll mb-10 mt-10">
                Unlike Birkeland and Eyde's approach, he put his Nitrogen in a "pressure cooker".
            </p>
            <p className="fade-in-on-scroll mb-10 mt-10">
                He fails, but he publishes his data anyway.
            </p>
            <div className="fade-in-on-scroll">
                <div
                    className="mt-20 text-9xl "
                    style={{
                        color: `rgb(130, 0, 0)`,
                    }}
                >
                    24
                </div>
                <p className="mt-1 text-2xl">Years until famine</p>
            </div>
            <p className="fade-in-on-scroll mb-40 mt-20 text-2xl">1907 Germany</p>
            <p className="fade-in-on-scroll mb-10">
                "I would like to suggest that Professor Haber now employ a method that is certain to
                produce truly precise values."
            </p>
            <p className="fade-in-on-scroll mt-10">Your numbers are "highly erroneous"</p>
            <p className="fade-in-on-scroll mt-10 ">
                Haber would not let Nernst, a soon-to-be nobel laureate corrode his reputation as a
                precise experimentalist.
            </p>
            {/*<p className="fade-in-on-scroll ">*/}
            {/*    Haber manufactured it in a vessel. By increasing the temperature, and pressure of*/}
            {/*    air, he calculated that it's possible to break the N&#8322; bond.*/}
            {/*</p>*/}
            <p className="fade-in-on-scroll mt-20">So he turns up the heat.</p>
            <IncreaseHeat />
            <p className="fade-in-on-scroll ">
                Crams Nitrogen into a density no lighter than a Neutron star
            </p>
            <IncreasePressure />
            <p className="fade-in-on-scroll ">
                Preheats the reagents with the hot exhaust ammonia.
            </p>
            <p className="fade-in-on-scroll ">And tries hundreds of catalysts</p>
            <p className="fade-in-on-scroll ">Until finally, in 1909: </p>
            {/* animation of one cubic drop from his machine*/}
            <p className="fade-in-on-scroll ">
                His machine produces one cubic centimeter of ammonia.
            </p>
            <p className="fade-in-on-scroll ">Once scaled, his process would feed the world. </p>
            <p className="fade-in-on-scroll ">The problem? It required</p>
            <p className="fade-in-on-scroll ">600 degrees C of temperature</p>
            <p className="fade-in-on-scroll ">
                Immense amounts of Osmium, one of the world's most expensive metals.
            </p>
            <p className="fade-in-on-scroll ">
                Vessels that can hold back one hundred atmospheres of pressure
            </p>
            <p className="fade-in-on-scroll ">
                Gigantic science-fiction compressors. Indestructable valves, guages, pipes
            </p>
            <p className="fade-in-on-scroll ">
                And finally, the hope that it would be profitable at scale.
            </p>
            <p className="fade-in-on-scroll ">
                BASF began hording all the Osmium in the world. And sent Carl Bosche to solve the
                rest.
            </p>
            <div className="fade-in-on-scroll">
                <div
                    className="mt-20 text-9xl "
                    style={{
                        color: `rgb(130, 0, 0)`,
                    }}
                >
                    25
                </div>
                <p className="mt-1 text-2xl">Years until famine</p>
            </div>
            <p className="fade-in-on-scroll ">
                It turns out Uranium also works as a catalyst. And it's much more abundant.
            </p>
            <p className="fade-in-on-scroll">This book changed my life because it taught me:</p>
            <p className="fade-in-on-scroll">
                humanity has solved calamity-scale problems before. I used to be worried of climate
                change, but this perspective gives me hope of a supernatural technological leap
                around the corner.
            </p>
            <p className="fade-in-on-scroll">
                The best solutions to problems isn't always to use nature or biomimicry.
            </p>
            <p className="fade-in-on-scroll">
                True technological advances, requires years of grit.
            </p>
            <p className="fade-in-on-scroll">
                I think a a modern version of crooke's challenge is the quest for economical nuclear
                fusion. Laboratories slam plasma together at millions of degrees, with magnetic
                forces probably stronger than rail-guns. Little by little, these labs try to improve
                their yields, because they believe that nuclera fusion is economically possible
            </p>
            <p>
                What else did these Nobel laureates do? More alchemy of course. You can feel it in
                the air.
            </p>
            <div className="mb-40" />;
        </div>
    );
}
