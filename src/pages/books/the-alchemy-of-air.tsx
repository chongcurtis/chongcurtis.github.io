import React from "react";
import { initAnimations, NARRATIVE_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";
import ExponentialCount from "@/components/books/the-alchemy-of-air/ExponentialCount";
import AlchemyOfAirTitle from "@/components/books/the-alchemy-of-air/AlchemyOfAirTitle";
import sirWilliamCrookes from "public/books/the-alchemy-of-air/Sir_William_Crookes_1906.jpg";
import fritzHaber from "public/books/the-alchemy-of-air/Fritz_Haber.png";
import alwinMittasch from "public/books/the-alchemy-of-air/Alwin_Mittasch.jpg";
import newInventions from "public/books/the-alchemy-of-air/new_inventions.png";
import carlKrauch from "public/books/the-alchemy-of-air/Carl_Krauch.jpg";
import carlBosch from "public/books/the-alchemy-of-air/Carl_Bosch.jpg";
import FixNitrogen from "@/components/books/the-alchemy-of-air/FixNitrogen";
import IncreaseHeat from "@/components/books/the-alchemy-of-air/IncreaseHeat";
import IncreasePressure from "@/components/books/the-alchemy-of-air/IncreasePressure";
import CultivateAllArableLand from "@/components/books/the-alchemy-of-air/CultivateAllArableLand";
import OptimallyRotateCrops from "@/components/books/the-alchemy-of-air/OptimallyRotateCrops";
import IncreaseFertilityOfLand from "@/components/books/the-alchemy-of-air/IncreaseFertilityOfLand";
import ArcFurnace from "../../components/books/the-alchemy-of-air/ArcFurnace";
import { HundredsOfCatalysts } from "../../components/books/the-alchemy-of-air/HundredsOfCatalysts";
import ThinLine from "@/components/ThinLine";
import BulletsStrikeSand from "../../components/books/the-alchemy-of-air/BulletsStrikeSand";
import Explosion from "../../components/books/the-alchemy-of-air/Explosion";
import Bowling from "../../components/books/the-alchemy-of-air/Bowling";
import CubicDrop from "../../components/books/the-alchemy-of-air/CubicDrop";
import Link from "next/link";

export default function TheAlchemyOfAir() {
    React.useEffect(() => {
        return initAnimations(NARRATIVE_ANIMATION_TRIGGER_DECIMAL);
    }, []);

    return (
        <div className="px-3 text-center text-lg">
            {/* this is used for debugging*/}
            {/*<div id="mover" className="absolute h-3 w-3 bg-blue-400"></div>*/}
            {/*<div className="fixed mt-[70vh] h-3 w-3 bg-red-400"></div>*/}
            <div className="mt-20" />
            <div className="m-auto items-center">
                <AlchemyOfAirTitle />
            </div>
            <p className="fade-in-on-scroll text-md mb-32 mt-10">
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
            <div className="mt-20 flex flex-row flex-wrap items-center justify-center md:flex-nowrap">
                <div className="fade-in-on-scroll max-w-sm p-20 md:m-5">
                    <img src={sirWilliamCrookes.src} alt="Sir William Crookes" />
                </div>
                <div className="fade-in-on-scroll animation-delay-500">
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
            <p className="fade-in-on-scroll mb-20 mt-10">
                "Our wheat-producing soil is totally unequal to the strain put upon it."
            </p>
            <p className="fade-in-on-scroll mb-20">
                To meet this deficit, England will have to import grain from abroad
            </p>
            <p className="fade-in-on-scroll mb-40 mt-10 ">However...</p>
            <p className="fade-in-on-scroll mb-10 ">
                Austro-Hungary's population will also increase
            </p>
            <p className="fade-in-on-scroll mb-10 "> Canada as well</p>
            <p className="fade-in-on-scroll mb-10 "> Russia as well</p>
            <p className="fade-in-on-scroll mb-32 "> America as well</p>

            <p className="fade-in-on-scroll mb-32 "> Wheat will be a global covet</p>
            {/*<p className="fade-in-on-scroll mb-10 ">And if there's a war, imports will...</p>*/}
            <p className="fade-in-on-scroll mb-40 mt-40 text-2xl">
                England will{" "}
                <span className="underline-on-scroll animation-delay-200 after:bg-red-400">
                    starve
                </span>{" "}
                in 33 years.
            </p>
            <p className="fade-in-on-scroll mb-32 mt-10">Tense silence suffocates the room</p>
            <p className="fade-in-on-scroll mb-20 mt-10">
                "Wheat preeminently demands nitrogen, fixed in the form of ammonia"
            </p>
            <p className="fade-in-on-scroll mb-20 mt-10 ">
                "We must then rely on nitrogenous manures to increase the fertility of land under
                wheat"
            </p>
            <IncreaseFertilityOfLand />
            {/*"We must then rely on nitrogenous manures to increase the fertility of land under*/}
            {/*wheat, so as to raise the yield from the world's low average - 12.7 bushels per acre*/}
            {/*- to a higher average".*/}
            <p className="fade-in-on-scroll mb-10 mt-10 ">
                Yet "for years we have been expending fixed nitrogen at a culpably extravagant
                rate".
            </p>
            <p className="fade-in-on-scroll mt-10 ">
                At present, England's fertilizer is imported from the Chilean desert.
            </p>
            <p className="fade-in-on-scroll mb-32 mt-32 ">But it will soon empty.</p>
            <p className="fade-in-on-scroll mt-10 ">
                Fortunately, "nitrogen is one of the most abundant and pervading bodies on the face
                of the earth."
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
            <p className="fade-in-on-scroll mb-20 mt-32">This was Brook's challenge:</p>
            <p className="fade-in-on-scroll mb-20 mt-10 text-2xl ">
                Convert N<sub>2</sub> &rarr; NH<sub>3</sub>
            </p>
            <p className="fade-in-on-scroll mb-20 mt-10 text-2xl ">And save the world</p>
            {/*<p className="fade-in-on-scroll mt-10 ">*/}
            {/*    His address was sensational. Newspapers printed it around the world.*/}
            {/*</p>*/}
            <p className="fade-in-on-scroll mb-10 text-xl">
                Newspapers printed his address around the globe.
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
            <ArcFurnace />
            <p className="fade-in-on-scroll mb-32 mt-10 ">
                Birkeland and Eyde create artificial lightning, splitting N&#8322; for the first
                time.
            </p>
            {/*<p className="fade-in-on-scroll mb-10 mt-10 ">*/}
            {/*    It takes 15 MWh To produce a ton of fixed nitrogen (nitric acid).*/}
            {/*</p>*/}
            {/*https://www.bing.com/search?q=10*1000+kwh+to+mwh&qs=n&form=QBRE&sp=-1&ghc=2&lq=0&pq=10*1000+kwh+to+mwh&sc=7-18&sk=&cvid=A25F9A80B2A448D98B96FAB5EDD5E887&ghsh=0&ghacc=0&ghpl=*/}
            {/*https://arena.gov.au/projects/hydrogen-to-ammonia/*/}
            <p className="fade-in-on-scroll mb-32 mt-10 ">But the process is:</p>
            <div className="mb-32 mt-10 flex items-center">
                <div className="fade-in-on-scroll ml-6 mr-4 text-3xl font-bold text-[#750000] md:ml-0">
                    1.
                </div>
                <p className="fade-in-on-scroll text-left">Prohibitively expensive</p>
            </div>
            <div className="mb-32 mt-10 flex flex-row sm:justify-start md:justify-center">
                <div className="fade-in-on-scroll ml-6 mr-4 text-3xl font-bold text-[#bb0000] md:ml-0">
                    2.
                </div>
                <p className="fade-in-on-scroll mt-1">Corrosive</p>
            </div>
            <div className="mb-32 mt-10 flex sm:justify-start md:justify-end">
                <div className="fade-in-on-scroll ml-6 mr-4 text-3xl font-bold text-[#ff0000] md:ml-0">
                    3.
                </div>
                <p className="fade-in-on-scroll mt-1 text-right">And so hot it fries the machine</p>
            </div>
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
            <div className="mt-20 flex flex-row flex-wrap items-center justify-center md:flex-nowrap">
                <div className="fade-in-on-scroll max-w-sm p-20 md:m-5">
                    <img src={fritzHaber.src} alt="Sir William Crookes" />
                </div>
                <div className="fade-in-on-scroll text-center">
                    <p>Enter Fritz Haber. A chemist still vying for his Nobel prize.</p>
                </div>
            </div>
            <p className="fade-in-on-scroll mb-10 mt-10">
                Unlike Birkeland and Eyde's approach, he squeezes his Nitrogen with enough heat and
                pressure to force Nitrogen to give up its triple molecular bond.
            </p>
            <p className="fade-in-on-scroll underline-on-scroll mb-32 mt-10 font-bold after:bg-red-400">
                N<sub>2</sub> + 3H<sub>2</sub> &rarr; 2NH<sub>3</sub>
            </p>
            <p className="fade-in-on-scroll mb-32 mt-10">He fails.</p>
            <p className="fade-in-on-scroll mb-10 mt-10">But he publishes his data anyway.</p>
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
            <p className="fade-in-on-scroll mb-32">
                "I would like to suggest that Professor Haber now employ a method that is certain to
                produce truly precise values."
            </p>
            <p className="fade-in-on-scroll mb-32 mt-10">Your numbers are "highly erroneous"</p>
            <p className="fade-in-on-scroll mt-10 ">
                Haber would not let Nernst, a soon-to-be Nobel laureate corrode his reputation as a
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
            <p className="fade-in-on-scroll ">And tries hundreds of catalysts</p>
            <HundredsOfCatalysts />
            <p className="fade-in-on-scroll mb-32">Until finally, in 1909: </p>
            <CubicDrop />
            {/* animation of one cubic drop from his machine*/}
            <p className="fade-in-on-scroll mb-32 mt-10 text-2xl">
                Outpours one cubic centimeter of ammonia.
            </p>
            <p className="fade-in-on-scroll mt-10 ">
                Once scaled, his process would feed the world.
            </p>
            <p className="fade-in-on-scroll mb-40 mt-10 ">The problem? Scale requires...</p>
            {/*<p className="fade-in-on-scroll ">600 &deg;C of temperature</p>*/}
            <div className="mt-10 flex items-center">
                <div className="fade-in-on-scroll w-1/3 text-8xl text-[#750000]">1.</div>
                <p className="fade-in-on-scroll w-2/3 pl-4">
                    Immense amounts of Osmium, priced at a
                    <span className="font-bold text-[#750000]"> king's ransom</span>.
                </p>
            </div>
            <div className="mt-32 flex items-center">
                <div className="fade-in-on-scroll w-1/3 text-8xl text-[#bb0000]">2.</div>
                <div className="fade-in-on-scroll w-2/3 pl-4">
                    <p>
                        Vessels to withstand{" "}
                        <span className="font-bold text-[#bb0000]">one hundred atmospheres </span>{" "}
                        of pressure.
                    </p>
                    {/* <p className="mt-2 text-sm"> • Vessels regularly exploded at 7 atmospheres</p> */}
                    <p className="mt-4 text-base">Vessels regularly exploded at 7 atmospheres*</p>
                </div>
            </div>
            <div className="mt-32 flex items-center">
                <div className="fade-in-on-scroll w-1/3 text-8xl text-[#ff0000]">3.</div>
                <p className="fade-in-on-scroll w-2/3 pl-4">
                    And the political will to sink{" "}
                    <span className="font-bold text-[#ff0000]">colossal</span> sums of capital.
                </p>
            </div>

            <p className="fade-in-on-scroll mt-32">The German Dye company BASF:</p>
            <div className="flex items-center justify-center">
                <div className="max-w-2xl">
                    <ul className="fade-in-on-scroll mt-10 list-disc text-left">
                        <li className="fade-in-on-scroll mb-2 pl-2">Gave Haber a royalty</li>
                        <li className="fade-in-on-scroll mb-2 pl-2">
                            Gave Haber an enormous salary
                        </li>
                        <li className="fade-in-on-scroll mb-2 pl-2">
                            And began hoarding the world's Osmium.
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-20 flex flex-row flex-wrap items-center justify-center md:flex-nowrap">
                <div className="fade-in-on-scroll">
                    <p>They sent Carl Bosch to figure out the rest.</p>
                </div>
                <div className="fade-in-on-scroll max-w-sm p-20 md:m-5">
                    <img src={carlBosch.src} alt="Sir William Crookes" />
                </div>
            </div>
            <div className="fade-in-on-scroll">
                <div
                    className="mt-20 text-9xl "
                    style={{
                        color: `rgb(130, 0, 0)`,
                    }}
                >
                    23
                </div>
                <p className="mt-1 text-2xl">Years until famine</p>
            </div>
            <p className="fade-in-on-scroll mt-20">
                Hundreds of researchers endeavour at Bosch's lab. It harboured the most modern and
                sophisticated materials testing equipment
            </p>
            <p className="fade-in-on-scroll mt-20">And</p>
            <p className="fade-in-on-scroll mt-20">The cradle of smarts.</p>
            <div className="mt-20 flex flex-row flex-wrap items-center justify-center md:flex-nowrap">
                <div className="fade-in-on-scroll text-left">
                    <p className="fade-in-on-scroll mt-10 text-center text-3xl">Alwin Mittasch</p>
                    <ul className="fade-in-on-scroll ml-6 mt-10 list-disc text-left">
                        <li className="fade-in-on-scroll mb-2 pl-2">
                            Replaced the Osmium catalyst with Iron (II) Oxide.
                        </li>
                        <li className="fade-in-on-scroll mb-2 mt-10 pl-2">
                            Ran 20,000 experiments over 11 years to find a better catalyst.
                        </li>
                    </ul>
                    <p className="fade-in-on-scroll mt-10 text-center">There was no better one.</p>
                </div>
                <div className="fade-in-on-scroll max-w-sm p-20 md:m-5">
                    <img src={alwinMittasch.src} alt="Alwin Mittasch" />
                </div>
            </div>
            <div className="mt-20 flex flex-row flex-wrap items-center justify-center md:flex-nowrap">
                <div className="fade-in-on-scroll text-left">
                    <p className="fade-in-on-scroll text-center text-3xl">Carl Krauch</p>
                    <ul className="fade-in-on-scroll ml-6 mt-10 list-disc text-left">
                        <li className="fade-in-on-scroll mb-2 pl-2">
                            Detoxed the CO byproduct by cleaning exhaust gases with ammonia and
                            copper.
                        </li>
                    </ul>
                    <p className="fade-in-on-scroll ml-6 mt-10 text-base">
                        Sidenote: Hitler loved toxic gas experts.
                    </p>
                </div>
                <div className="fade-in-on-scroll max-w-sm p-20 md:m-5">
                    <img src={carlKrauch.src} alt="Carl Krauch" />
                </div>
            </div>
            <p className="fade-in-on-scroll mt-20">
                With these problems solved, Bosch focused on the machinery to handle the enormous
                pressures involved.
            </p>
            <p className="fade-in-on-scroll mt-20">
                To manufacture ammonia, Bosch precisely controls the concentration of reagents in
                environments 20 times hotter than steam locomotive boilers.
            </p>
            <p className="fade-in-on-scroll mb-32 mt-20">
                And to prevent hydrogen from leaking and Hindenburging his lab...
            </p>
            <p className="fade-in-on-scroll mb-32 mt-20">Bosch reinvents</p>
            <div className="fade-in-on-scroll ">
                <img src={newInventions.src} alt="BASF New Inventions" />
            </div>
            <p className="fade-in-on-scroll mt-20">
                At the heart of it all were the world's largest ovens.
            </p>
            <Explosion />
            <p className="fade-in-on-scroll animation-delay-800 mt-10">
                He sent dozens of metallurgists to analyze debris from every failure.
            </p>
            <p className="fade-in-on-scroll mt-10">
                And every analysis revealed hydrogen mixed in with the steel.
            </p>
            <p className="fade-in-on-scroll mt-10">
                Why? Because the high pressure caused the walls of his furnace to absorb hydrogen,
                making them brittle.
            </p>
            <p className="fade-in-on-scroll mb-32 mt-10">
                He's defeated. So he spends his only night off bowling with his team.
            </p>
            <Bowling />
            <p className="fade-in-on-scroll animation-delay-800 mb-32 mt-20">
                The following day, Bosch drills holes into the walls of his furnace. Small enough to
                keep the pressure but large enough for hydrogen to leak out.
            </p>
            <p className="fade-in-on-scroll mb-32 mt-10">
                {/*It works. Ammonia spills from his furnace. Haber and Bosch have just averted global*/}
                {/*famine.*/}
                It works.
            </p>
            <p className="fade-in-on-scroll mb-32 mt-10">They did it with 20 years to spare.</p>
            <p className="fade-in-on-scroll mb-32 mt-10">With 1911 technology</p>
            <div className="mb-32 flex-row">
                <ExponentialCount
                    startingNumber={18}
                    endingNumber={1000000}
                    exponentialAmount={0.9}
                    startingWaitDuration={500}
                    startingRedness={200}
                />
                <p className="fade-in-on-scroll mt-1">Years until famine </p>
            </div>
            <p className="fade-in-on-scroll mb-20">Hauntingly punctual for...</p>
            <br />
            <BulletsStrikeSand />
            <p className="fade-in-on-scroll mt-20">
                Because Nitrogen has the very special property of propelling projectiles.
            </p>
            <p className="fade-in-on-scroll mb-20 mt-10">
                And it extended Germany's war by two years.
            </p>
            {/* this sentence is too much of a departure. make it smoother */}
            <ThinLine />

            <p className="fade-in-on-scroll mt-20">
                This epochal moment is one of my favourites because I learned:
            </p>
            <div className="flex items-center justify-center">
                <div className="max-w-2xl">
                    <ul className="fade-in-on-scroll mt-10 list-disc text-left">
                        <li className="fade-in-on-scroll mb-2 pl-2">
                            Of "the biggest scientific effort in history, comparable to the
                            Manhattan Project in World War II".{" "}
                            <span className="font-bold">And the world forgot it!</span>
                        </li>
                        <li className="fade-in-on-scroll mb-2 mt-5 pl-2">
                            How humanity surmounted a calamity-scale problem, waning my climate
                            anxiety.
                        </li>
                        <li className="fade-in-on-scroll mb-2 mt-5 pl-2 ">
                            And that the best solutions may not mimic nature.
                        </li>
                        {/* <li className="fade-in-on-scroll">
                            And that diligent experimental processes compound to incredible results.
                        </li> */}
                    </ul>
                </div>
            </div>

            <p className="fade-in-on-scroll mt-20 ">
                Of course, these scientists weren't perfect. They killed many people, Haber
                especially.
            </p>
            <p className="fade-in-on-scroll mt-10">
                And Bosch didn't know it at the time, but his years of work pioneered an entire new
                field:
            </p>
            <p className="fade-in-on-scroll mb-20 mt-20 text-2xl">High-pressure chemistry.</p>
            {/*<p className="fade-in-on-scroll">*/}
            {/*    I think a a modern version of crooke's challenge is the quest for economical nuclear*/}
            {/*    fusion. Laboratories slam plasma together at millions of degrees, with magnetic*/}
            {/*    forces probably stronger than rail-guns. Little by little, these labs try to improve*/}
            {/*    their yields, because they believe that nuclera fusion is economically possible*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*    What else did these Nobel laureates do?
            {/*</p>*/}
            <p className="fade-in-on-scroll">
                So what's next for Haber and Bosch? Do they inherit a million of Nobel's fortune?
                Establish their own wealth? Pledge to The Reich?
            </p>
            {/*it would be cool if all the other words in this phrase just disappeared, and all you saw was "the alchemy of air"*/}
            <p className="fade-in-on-scroll mt-20">You'll have to read the book.</p>
            <p className="fade-in-on-scroll mt-20">But they did more alchemy of course.</p>
            <p className="fade-in-on-scroll mt-20">You can feel it in the air.</p>
            <p className="fade-in-on-scroll mt-32 text-2xl">Sources</p>
            <div className="flex flex-col items-center justify-center px-5">
                {[
                    {
                        title: "The Alchemy of Air: A Jewish Genius, a Doomed Tycoon, and the Scientific Discovery That Fed the World but Fueled the Rise of Hitler",
                        link: "www.goodreads.com/en/book/show/3269091",
                    },
                    {
                        title: "Address of the President Before the British Association for the Advancement of Science, Bristol, 1898",
                        link: "www.jstor.org/stable/1627238?seq=2",
                    },
                    {
                        title: "Birkeland–Eyde process",
                        link: "en.wikipedia.org/wiki/Birkeland%E2%80%93Eyde_process",
                    },
                ].map((source, idx) => {
                    return (
                        <div className="fade-in-on-scroll text-md mt-5 p-5" key={`sources-${idx}`}>
                            <p className="text-left">
                                {source.title}
                                {` `}
                                {/* break-all is really important, or else the link are too wide and the page is unreadable on mobile */}
                                {/* we have the w-[200px] property, so when the user is on a mobile screen, the long links don't push the edges of the screen too much and mess up the formatting for the entire page */}
                                <Link
                                    className={`inline-block w-[200px] break-all text-left text-sleepover-secondary md:w-full`}
                                    href={`https://${source.link}`}
                                    target="_blank"
                                    rel="noopener noreferrer" // It's a good practice to include this when using target="_blank"
                                >
                                    {source.link}
                                </Link>
                            </p>
                        </div>
                    );
                })}
            </div>

            <p className="fade-in-on-scroll mt-10 pl-10 text-left">Images from Wikipedia</p>
            <p className="fade-in-on-scroll mt-10 ">
                P.S. Bosch didn't come up with his idea during bowling, But the morning after.
            </p>
            {/* This footer is needed so the bottom elements will fade into view*/}
            <div className="h-[30rem]" />
        </div>
    );
}
