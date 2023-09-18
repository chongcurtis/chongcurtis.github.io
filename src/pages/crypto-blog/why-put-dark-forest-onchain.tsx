import { NARRATIVE_ANIMATION_TRIGGER_DECIMAL, initAnimations } from "@/common/animations";
import React from "react";

export default function WhyPutDarkForestOnchain() {
    React.useEffect(() => {
        return initAnimations(NARRATIVE_ANIMATION_TRIGGER_DECIMAL);
    }, []);

    return (
        <div className="px-3 text-center text-lg">
            Dark Forest is a multiplayer game where players fight to win an interplanetary war. This
            open-sourced game was designed to be highly moddable so strangers can spin up a server
            and play together. There’s even a prize pool if you win! Wait… If the game is highly
            moddable, why can’t the player hosting it add a backdoor and give themselves an
            advantage? Because the game runs on-chain, which: 1. Verifies the code running the game
            is untampered (doesn’t give unfair advantages to specific players) 2. Will never delay
            or block incoming actions by targeted players. (player actions are censorship-resistant)
            Since the chain gives these assurances, you can trust that modded versions of the game
            aren’t giving the mod creator unfair advantages. Isn’t that cool? These magical
            properties enable adversaries - even those that vie for the same prize pool - to believe
            in the game's fairness, since they can look at the code on-chain and confirm that it’s
            fair. In traditional games, we’d need to trust a central authority to host each match
            (e.g. Riot Games). And that’s fine for most games! But if the game encourages the
            community to play on modded versions, then it’d be challenging for that central
            authority to verify the innocence of every mod. I love this game because it’s an example
            of “serious behaviour” which is only possible on-chain. And thousands of more behaviours
            have yet to emerge. So let's find them out together. - Curtis P.S. Dark forest could
            have been placed on a Trusted Execution Environment (TEE), which would give players the
            guarantee that the code is untampered (via a TEE attestation). However, the server host
            could still block incoming requests from individual players (effectively censoring their
            actions).
        </div>
    );
}
