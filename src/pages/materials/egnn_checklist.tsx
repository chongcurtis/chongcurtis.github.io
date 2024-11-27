import { initAnimations, NORMAL_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";
import React from "react";

export default function Polymers() {
    const prevAnimation = React.useRef(null);
    React.useEffect(() => {
        return initAnimations(NORMAL_ANIMATION_TRIGGER_DECIMAL, prevAnimation);
    }, []);

    return (
        <div className="px-3 text-lg">
            <p className="fade-in-on-scroll mt-20 text-center text-2xl">
                E(3) Equivariant Graph Neural Network Checklist
            </p>
            <p className="fade-in-on-scroll mt-10">
                This is a my checklist for training E(3) Equivariant GNNs. I wanted to put this
                together to condense months of lessons I've learned.
            </p>
            <p className="fade-in-on-scroll mt-10">
                1) When performing message passing, try encoding the distance between the sender &
                receiver nodes into the edge message.
            </p>
            <p className="fade-in-on-scroll mt-10">
                2) The number of max neighbors you have biases your model. * if a bulk material has
                8 close neighbors, you're biasing the model to do WORSE in BCC crystals * cause in
                BCC, the center cell can have 14 neighbors * note that you also have a self-loop, so
                that's even more * it's a painful tradeoff between speed and quality
            </p>
            <p className="fade-in-on-scroll mt-10">
                However, recent ml advancements significantly bring down the cost of these
                calculations (since they run in O(n) rather than O(n^3), where n is the number of
                atoms).
            </p>
            <p className="fade-in-on-scroll mt-10">
                These models are often used to predict the properties of a material directly.
                However, we can use these models to do more. To create realistic-looking polymers in
                a computer:
            </p>
            <p className="fade-in-on-scroll mt-10">(yes. this is interactive!)</p>
            <p className="fade-in-on-scroll mt-20">
                Here, I am growing a polymer similar to how polymers are created in real life. Each
                repeating segment is attached one by one.
            </p>
            <p className="fade-in-on-scroll mt-10">Here's the algorithm:</p>
            <ol className="fade-in-on-scroll list-inside list-decimal space-y-2 pl-2">
                <li className="fade-in-on-scroll">Create the base of each chain</li>
                <li className="fade-in-on-scroll">Place each mer unit on the end of a chain</li>
                <li className="fade-in-on-scroll">
                    Use the model to perform a few relaxations so the bond angle (and distance)
                    looks like those seen in real-life
                </li>
                <ul className="fade-in-on-scroll pl-8">
                    <li className="fade-in-on-scroll list-disc">
                        Relaxing means: "moving the atoms to the lowest energy state" (where they
                        naturally want to go!)
                    </li>
                </ul>
                <li className="fade-in-on-scroll">
                    Keep on adding mer units until we're satisfied with the length of the chain
                </li>
                <li className="fade-in-on-scroll">
                    Perform more relaxations so the polymer settles into a suitable configuration
                </li>
            </ol>
            <p className="fade-in-on-scroll mt-10">
                Now that we have our polymer, we can stretch the system and calculate the forces
                (using the same ml model!) to calculate tensile strength:
            </p>

            <p className="fade-in-on-scroll mt-20">
                Note: I know this isn't how a polymer behaves when stretched. this is just an
                example of what we can do with our polymer.
            </p>
            <p className="fade-in-on-scroll mt-10">
                This is amazing. We don't have to worry about conformer math or accidentally placing
                the atoms too close. The model handles all the inter-atomic forces and makes sure it
                looks realistic.
            </p>
            <p className="fade-in-on-scroll mt-10">
                TLDR: It's hard to write buggy code using this algorithm.
            </p>
            <p className="fade-in-on-scroll mt-10">Future directions we can take with this tech:</p>
            <ol className="fade-in-on-scroll list-inside list-decimal space-y-2 pl-2">
                <li className="fade-in-on-scroll">
                    Create a "rag doll" simulation of polymers, so if we add inter-chain bonds
                    (cross-links), we can see move atoms around and ensure that the chain ends up at
                    a good rest position.
                </li>
                <li className="fade-in-on-scroll">
                    Display a real-time update of the predicted properties. so when ppl add atoms to
                    the chain / move it around, they can see how their changes affect the predicted
                    properties
                </li>
                <li className="fade-in-on-scroll">
                    Once polymer predictions are super fast, we can teach a model to use
                    reinforcement learning to design polymers for us! This is exciting because there
                    are so many possible polymers that it's infeasible for humans to go through the
                    search space one by one manually.
                </li>
            </ol>
            <p className="fade-in-on-scroll mt-10">
                Note: there are problems with the current approach:
            </p>
            <ul className="fade-in-on-scroll list-inside list-decimal space-y-2 pl-2">
                <li className="fade-in-on-scroll">
                    The training data for the neural network uses traditional DFT calculations -
                    which can't adequately capture long-range interactions or van-der-wall forces
                    (important for polymers)
                </li>
                <li className="fade-in-on-scroll">
                    The neural network was trained for atoms at absolute zero.
                </li>
            </ul>
            <p className="fade-in-on-scroll mt-10">
                Anyway, that's about it! If you're interested in playing around, check out the code{" "}
                <a
                    href="https://github.com/curtischong/polymer-builder"
                    target="_blank"
                    className="underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                >
                    here!
                </a>
            </p>
            <p className="fade-in-on-scroll mt-10">- Curtis</p>
            <div className="h-96"></div>
        </div>
    );
}
