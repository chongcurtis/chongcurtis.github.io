import React from "react";
import { initAnimations } from "@/common/animations";
import ExponentialCount from "@/pages/books/the-alchemy-of-air/ExponentialCount";

export default function TheAlchemyOfAir() {
    React.useEffect(() => {
        return initAnimations();
    }, []);

    return (
        <>
            <div className="mt-20" />
            {/*<AlchemyOfAirTitle />*/}
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
            <p className="fade-in-on-scroll mt-20 text-2xl">1898</p>
            <div className="mt-20 flex flex-row">
                <div className="fade-in-on-scroll animation-delay-1500 flex flex-col justify-center align-middle">
                    <p className="fade-in-on-scroll mt-8 text-lg">
                        "England and all civilized nations, stand in deadly peril of not having
                        enough to eat."
                    </p>
                </div>
                {/*<img*/}
                {/*    className="fade-in-on-scroll m-5 max-w-sm p-20"*/}
                {/*    src={sirWilliamCrookes.src}*/}
                {/*    alt="Sir William Crookes"*/}
                {/*/>*/}
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
            {/*<p className="fade-in-on-scroll mt-10 text-xl">*/}
            {/*    "As mouths multiply, food sources dwindle"*/}
            {/*</p>*/}
            {/*<p className="fade-in-on-scroll mt-10 text-xl">*/}
            {/*    At present, England's fertilizer is imported from the Chilian desert. But it will*/}
            {/*    soon run out.*/}
            {/*</p>*/}
            <p className="fade-in-on-scroll mt-10 text-xl">
                Even if all arable land is cultivated, and crops are optimally rotated, and everyone
                becomes vegetarian...
            </p>
            <p className="fade-in-on-scroll mt-10 text-xl">
                "Our wheat-producing soil is totally unequal to the strain put upon it."
            </p>
            <p className="fade-in-on-scroll mt-10 text-xl">
                {" "}
                So England will have to import. However...
            </p>
            <p className="fade-in-on-scroll mt-[100px] text-xl">
                Austro-Hungary will not have surplus wheat{" "}
            </p>
            <p className="fade-in-on-scroll mt-10 text-xl"> Canada will not have surplus wheat</p>
            <p className="fade-in-on-scroll mt-10 text-xl"> Russia will not have surplus wheat</p>
            <p className="fade-in-on-scroll mt-10 text-xl"> America will not have surplus wheat</p>
            <p className="fade-in-on-scroll mt-10 text-xl">And if there's a war, imports will...</p>
            <p className="fade-in-on-scroll mb-[150px] mt-[150px] text-xl">
                England will{" "}
                <span className="underline-on-scroll animation-delay-200 after:bg-red-400">
                    starve
                </span>{" "}
                in 33 years.
            </p>
            <p className="fade-in-on-scroll mt-10 text-xl">Tense silence suffocates the room</p>
            <p className="fade-in-on-scroll mt-10 text-xl">
                "Wheat preeminently demands nitrogen, fixed in the form of ammonia"
            </p>
            <p className="fade-in-on-scroll mt-10 text-xl">
                "We must then rely on nitrogenous manures to increase the fertility of land under
                wheat, so as to raise the yield from the world's low average - 12.7 bushels per acre
                - to a higher average".
            </p>
            <p className="fade-in-on-scroll mt-10 text-xl">
                Yet "for years we have been expending fixed nitrogen at a culpably extravagant
                rate".
            </p>
            <p className="fade-in-on-scroll mt-10 text-xl">
                At present, England's fertilizer is imported from the Chilean desert. But it will
                soon empty.
            </p>
            <p className="fade-in-on-scroll mt-10 text-xl">
                Fortunately, "nitrogen is one of the most abundant and pervading bodies on the face
                of the earth".
            </p>
            {/*<p className="fade-in-on-scroll mt-10 text-xl">It's 78% of the air.</p>*/}
            <p className="fade-in-on-scroll mt-10 text-xl">
                But to turn N&#8322; into fertilizer, you must break nature's strongest molecular
                bond.
            </p>
            <p className="fade-in-on-scroll mb-[100px] mt-[100px] text-xl">
                And it has never been accomplished.
            </p>
            {/*<FixNitrogen />*/}
            {/*<p className="fade-in-on-scroll mt-10 text-xl">*/}
            {/*    "For years we have been expending fixed nitrogen at a culpably extravagant rate,*/}
            {/*    heedless of the fact that it is [naturally] fixed with extreme slowness and*/}
            {/*    difficulty".*/}
            {/*</p>*/}
            {/*<p className="fade-in-on-scroll mt-10 text-xl">*/}
            {/*    "There is a gleam of light out of this darkness of despondency. In its free state,*/}
            {/*    nitrogen is one of the most abundant and pervading bodies on the face of the earth".*/}
            {/*</p>*/}
            {/*<p className="fade-in-on-scroll mt-10 text-xl">Brook ends on a hopeful note:</p>*/}
            {/*<p className="fade-in-on-scroll mt-10 text-xl">*/}
            {/*    "The fixation of nitrogen is vital to the progress of civilized humanity".*/}
            {/*</p>*/}
            <p className="fade-in-on-scroll mt-10 text-xl">
                "There is a gleam of light out of this darkness of despondency. [...] Before we are
                in the grip of actual dearth, the chemist will step in and postpone the day of
                famine".
            </p>
            {/*<p className="fade-in-on-scroll mt-10 text-xl">*/}
            {/*    Many didn't believe him, stating that the Chilian desert has an unlimitted amount of*/}
            {/*    fertilizer.*/}
            {/*</p>*/}
            {/*<p className="fade-in-on-scroll mt-10 text-xl">*/}
            {/*    But they were wrong. Because our population doubled, and doubled, and doubled.*/}
            {/*</p>*/}
            <p className="fade-in-on-scroll mt-10 text-xl">
                This was Brook's challenge: To fix nitrogen, and save mankind.
            </p>
            <p className="fade-in-on-scroll mt-10 text-xl">
                His address was sensational. Newspapers printed it around the world.
            </p>
            <p className="fade-in-on-scroll mt-40 text-2xl">The race to fix nitrogen had begun.</p>
            {/* <p className="fade-in-on-scroll mt-40 text-xl">31 years until famine</p> */}
            <div className="fade-in-on-scroll mt-40 flex flex-row justify-center text-xl">
                <ExponentialCount startingNumber={100} endingNumber={31} exponentialAmount={0.95} />
                <p>Years until Famine </p>
            </div>
            <p className="fade-in-on-scroll mt-20 text-2xl">1895 Germany</p>
            <p className="fade-in-on-scroll mt-40 text-xl">Enter Fritz Haber</p>
            <p className="fade-in-on-scroll mt-40 text-xl">20 years until famine</p>
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
