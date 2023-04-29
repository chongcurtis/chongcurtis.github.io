import Boiler from "@/pages/books/the-alchemy-of-air/Boiler";
import React from "react";
import { initAnimations } from "@/common/animations";
import AlchemyOfAirTitle from "@/pages/books/the-alchemy-of-air/AlchemyOfAirTitle";
import BulletsStrikeSand from "@/pages/books/the-alchemy-of-air/BulletsStrikeSand";

export default function TheAlchemyOfAir() {
    React.useEffect(() => {
        return initAnimations();
    }, []);

    return (
        <>
            <div className="mt-20" />
            {/*<AlchemyOfAirTitle />*/}
            {/*TODO: uncomment after fixing collision*/}
            {/*<Boiler />*/}
            <BulletsStrikeSand />
            {/*</div>*/}
            <p className="fade-in-on-scroll">
                This book changed my life because it taught me that humanity has solved
                calamity-scale problems before: Running out of food. It's about how a scientist and
                an engineer spent years bringing down the cost of man-made fertilizer to replace the
                world's limitted supply of natural fertilizer, feeding half the world population. It
                made me much more optimistic about climate change. It was really fascinating because
                these people solved the world's biggest problem and nobody knows about it.
            </p>
            <div className="mb-40" />;
        </>
    );
}
