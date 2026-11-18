import { initAnimations, NORMAL_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";
import Head from "next/head";
import React from "react";

export default function PeriodicRoPEMLIP() {
    const prevAnimation = React.useRef(null);
    React.useEffect(() => {
        return initAnimations(NORMAL_ANIMATION_TRIGGER_DECIMAL, prevAnimation);
    }, []);

    return (
        <>
            <Head>
                <title>Periodic RoPE MLIP | Curtis&apos; Site</title>
            </Head>
            <div className="px-3 text-md">
                <h1 className="fade-in-on-scroll mt-20 text-center text-2xl">
                    Periodic RoPE MLIP
                </h1>
                <p className="fade-in-on-scroll mt-10">Write-up coming soon.</p>

                {/* Add the project introduction, figures, and results here. */}

                <p className="fade-in-on-scroll mt-10">- Curtis</p>
                <div className="h-96"></div>
            </div>
        </>
    );
}
