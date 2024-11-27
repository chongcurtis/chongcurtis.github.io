import { initAnimations, NORMAL_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";
import { EasyList } from "@/pages/materials/EasyList";
import Link from "next/link";
import React from "react";

export default function Polymers() {
    const prevAnimation = React.useRef(null);
    React.useEffect(() => {
        return initAnimations(NORMAL_ANIMATION_TRIGGER_DECIMAL, prevAnimation);
    }, []);

    return (
        <div className="px-3 text-lg">
            <p className="mt-20 text-center text-2xl">
                E(3) Equivariant Graph Neural Network Checklist
            </p>
            <p className="mt-10">
                This is a my checklist for training E(3) Equivariant GNNs. I wanted to put this
                together to condense months of lessons I've learned.
            </p>
            <h3 className="mt-10 text-2xl">Table of Contents</h3>
            <ul className="ml-8 mt-2 list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                <li className="">
                    <a
                        href="#general-gnn-checklist"
                        className="underline-on-scroll after:bg-sleepover-secondary"
                    >
                        General GNN Checklist
                    </a>
                </li>
                <li className="">
                    <a
                        href="#equivariant-gnn-checklist"
                        className="underline-on-scroll after:bg-sleepover-secondary"
                    >
                        Equivariant GNN Checklist
                    </a>
                </li>
                <li className="">
                    <a
                        href="#material-science-gnn-checklist"
                        className="underline-on-scroll after:bg-sleepover-secondary"
                    >
                        Material Science GNN Checklist
                    </a>
                </li>
                <li className="">
                    <a
                        href="#diffusion-model-checklist"
                        className="underline-on-scroll after:bg-sleepover-secondary"
                    >
                        Diffusion Model Checklist
                    </a>
                </li>
            </ul>
            <h3 id="general-gnn-checklist" className="mt-10 text-2xl">
                General GNN Checklist
            </h3>
            <EasyList
                items={[
                    {
                        beforeContent: "1.1",
                        content:
                            "When performing message passing, try encoding the distance between the sender & receiver nodes into the edge message.",
                    },
                    {
                        beforeContent: "1.2",
                        content:
                            "Get creative with the loss. It doesn't have to be the output of node states.",
                        children: [
                            {
                                content: "You can use the edge messages as well.",
                            },
                            {
                                content:
                                    "Often, this is important if the edge distance in between the nodes are important to the final prediction",
                            },
                            {
                                content:
                                    "e.g. In diffusion models (like Mattergen), the edge distance loss teaches the model how close to place adjacent nodes",
                            },
                        ],
                    },
                    {
                        beforeContent: "1.3",
                        content: "Know when to predict scaled versions of your targets",
                        children: [
                            {
                                content:
                                    "e.g. Predicting x per number of atoms may be better than just predicting x.",
                            },
                        ],
                    },
                ]}
            />
            <h3 id="equivariant-gnn-checklist" className="mt-10 text-2xl">
                Equivariant GNN Checklist
            </h3>
            <EasyList
                items={[
                    {
                        beforeContent: "2.1",
                        content: "Think equivariantly. Use equivariant features.",
                        children: [
                            {
                                content:
                                    "E.g. In diffusion models for material science, use the lattice vectors as 3D features, not 9 scalar values to learn on",
                            },
                            {
                                content:
                                    "Another example: if you are passing the symmetric matrix of the lattice vectors as input features, is that equivariant?",
                                children: [
                                    {
                                        content:
                                            "A symmetric matrix could be represented by three 3D vectors, but there's only 6 degrees of freedom. So how should you pass in the symmetric matrix? If at all?",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        beforeContent: "2.2",
                        content: "Only construct losses that are equivariant",
                    },
                    {
                        beforeContent: "2.3",
                        content: "Construct equivariant test cases",
                        children: [
                            {
                                content:
                                    "You don't even need to have your model trained to do this. Just run it on raw weights. Your goal is to test that F(R(x)) = R(F(x)). do this for a set of random rotations and a few x and you can be confident that your model is rotationally equivariant",
                            },
                        ],
                    },
                    {
                        beforeContent: "2.4",
                        content: "Make a nice API to feed in input features",
                        children: [
                            {
                                content:
                                    "Most often, we just want to pass in 1D or 3D features. A simple interface where the model accepts concatenated tensors of 1D or 3D feature inputs enables you to test various features more quickly",
                            },
                            {
                                content:
                                    "You want to pass in tensors to your model in the simplest way possible - not fiddle with irrep definitions (e.g. 0x1e + 5x1o)",
                            },
                        ],
                    },
                ]}
            />
            <h3 id="material-science-gnn-checklist" className="mt-10 text-2xl">
                Material Science GNN Checklist
            </h3>
            <EasyList
                items={[
                    {
                        beforeContent: "3.1",
                        content: "The number of max neighbors you have biases your model.",
                        children: [
                            {
                                content:
                                    "Cause in BCC crystals, the center cell can have 14 neighbors. So don't be too tempted to decrease the number of neighbors too much",
                                children: [
                                    {
                                        content:
                                            "If your max_neighbors cutoff is 8, you're biasing the model to do WORSE in FCC crystals (which can have 12 nearest neighbors)",
                                    },
                                ],
                            },
                            {
                                content:
                                    "Note: Account for self-loops (edges that points to the same node). This could hog up one neighbor slot (and increases computation)",
                            },
                        ],
                    },
                    {
                        beforeContent: "3.2",
                        content: "Use float64 (doubles). Molecular dynamics require such precision",
                        children: [
                            {
                                content: (
                                    <p>
                                        This is advice from Albert Musaelian! (An author of{" "}
                                        <Link
                                            href="https://arxiv.org/abs/2204.05249"
                                            className="underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                                            target="_blank"
                                        >
                                            Allegro
                                        </Link>
                                        )
                                    </p>
                                ),
                            },
                        ],
                    },
                    {
                        beforeContent: "3.3",
                        content: "Make sure your data data is at 0 Kelvin if you expect it",
                        children: [
                            {
                                content:
                                    "Because materials can settle to different relaxed configurations if they are not at 0 Kelvin",
                            },
                            {
                                content: (
                                    <p>
                                        If you have non-zero kelvin datasets, you need to first
                                        denoise them (see{" "}
                                        <Link
                                            href="https://arxiv.org/abs/2403.09549"
                                            className="underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                                            target="_blank"
                                        >
                                            Generalizing Denoising to Non-Equilibrium Structures
                                            Improves Equivariant Force Fields
                                        </Link>
                                        )
                                    </p>
                                ),
                            },
                        ],
                    },
                ]}
            />
            <h3 id="diffusion-model-checklist" className="mt-10 text-2xl">
                Diffusion Model Checklist
            </h3>
            <EasyList
                items={[
                    {
                        beforeContent: "4.1",
                        content:
                            "For each training sample, after you noise the graph, you need to recompute the graph edges since nodes may enter/leave the cutoff radius (which determines neighbors)",
                        children: [
                            {
                                content:
                                    "Note: Account for self-loops (edges that points to the same node). This could hog up one neighbor slot (and increases computation)",
                            },
                        ],
                    },
                    {
                        beforeContent: "4.2",
                        content:
                            "Periodic boundaries affect the loss. the norm of frac_x isn't just target frac_x - actual_frac_x",
                        children: [
                            {
                                content:
                                    "Cause if your model predicted 0.1, but the target frac_coord is 0.9, your model's prediction is NOT 0.8 away. it's 0.2",
                            },
                        ],
                    },
                    {
                        beforeContent: "4.3",
                        content: "Don't forget to input these global features",
                        children: [
                            {
                                content:
                                    "The current lattice as a feature (yes, even though it's implicit, this is very important)",
                            },
                            {
                                content: "The num_atoms",
                                children: [
                                    {
                                        content:
                                            "This seems important since it'll scale the length of the lattice (I need more testing though)",
                                    },
                                ],
                            },
                        ],
                    },
                ]}
            />
            <p className="mt-10">
                Anyway, that's about it! If you're interested in playing around, check out the code{" "}
                <a
                    href="https://github.com/curtischong/polymer-builder"
                    target="_blank"
                    className="underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                >
                    here!
                </a>
            </p>
            <p className="mt-10">- Curtis</p>
            <div className="h-96"></div>
        </div>
    );
}
