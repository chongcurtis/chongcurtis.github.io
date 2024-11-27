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
            <h3 className="fade-in-on-scroll mt-10 text-2xl">Table of Contents</h3>
            <ul className="ml-8 mt-2 list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                <li className="fade-in-on-scroll">
                    <a
                        href="#general-gnn-checklist"
                        className="underline-on-scroll after:bg-sleepover-secondary"
                    >
                        General GNN Checklist
                    </a>
                </li>
                <li className="fade-in-on-scroll">
                    <a
                        href="#equivariant-gnn-checklist"
                        className="underline-on-scroll after:bg-sleepover-secondary"
                    >
                        Equivariant GNN Checklist
                    </a>
                </li>
                <li className="fade-in-on-scroll">
                    <a
                        href="#material-science-gnn-checklist"
                        className="underline-on-scroll after:bg-sleepover-secondary"
                    >
                        Material Science GNN Checklist
                    </a>
                </li>
                <li className="fade-in-on-scroll">
                    <a
                        href="#diffusion-model-checklist"
                        className="underline-on-scroll after:bg-sleepover-secondary"
                    >
                        Diffusion Model Checklist
                    </a>
                </li>
            </ul>
            <h3 id="general-gnn-checklist" className="fade-in-on-scroll mt-10 text-2xl">
                General GNN Checklist
            </h3>
            <p className="fade-in-on-scroll mt-10">
                1.1) When performing message passing, try encoding the distance between the sender &
                receiver nodes into the edge message.
            </p>
            <h3 id="equivariant-gnn-checklist" className="fade-in-on-scroll mt-10 text-2xl">
                Equivariant GNN Checklist
            </h3>
            <h3 id="material-science-gnn-checklist" className="fade-in-on-scroll mt-10 text-2xl">
                Material Science GNN Checklist
            </h3>
            <p className="fade-in-on-scroll mt-4">
                <span className="font-bold text-red-400">(3.1)</span> The number of max neighbors
                you have biases your model.
            </p>
            <ul className="ml-8 mt-2 list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                <li className="fade-in-on-scroll ml-8">
                    Cause in BCC crystals, the center cell can have 14 neighbors. So don't be too
                    tempted to decrease the number of neighbors too much
                </li>
                <li className="fade-in-on-scroll ml-16">
                    If your max_neighbors cutoff is 8, you're biasing the model to do WORSE in FCC
                    crystals (which can have 12 nearest neighbors)
                </li>
                <li className="fade-in-on-scroll ml-16">
                    Note: Account for self-loops (edges that points to the same node). This could
                    hog up one neighbor slot (and increases computation)
                </li>
            </ul>
            <h3 id="diffusion-model-checklist" className="fade-in-on-scroll mt-10 text-2xl">
                Diffusion Model Checklist
            </h3>
            <p className="fade-in-on-scroll mt-4">
                <span className="mr-2 font-bold">(4.1)</span> For each training sample, after you
                noise the graph, you need to recompute the graph edges since nodes may enter/leave
                the cutoff radius (which determines neighbors)
            </p>
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
