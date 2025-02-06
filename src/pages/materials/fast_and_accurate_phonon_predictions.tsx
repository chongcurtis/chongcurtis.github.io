import { initAnimations, NORMAL_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";
import React from "react";
import { MantineProvider } from "@mantine/core";

export default function Polymers() {
    const prevAnimation = React.useRef(null);
    React.useEffect(() => {
        return initAnimations(NORMAL_ANIMATION_TRIGGER_DECIMAL, prevAnimation);
    }, []);

    return (
        <MantineProvider>
            <div className="px-3 text-lg">
                <p className="fade-in-on-scroll mt-20 text-center text-2xl">
                    A Path to Fast and Accurate Phonon Predictions
                </p>
                <p className="fade-in-on-scroll mt-20 text-center text-2xl">Feb 7 2025</p>
                <p className="fade-in-on-scroll mt-10">
                    It would be so cool if we asked a neural network: "what is the thermal
                    conductivity of this material (collection of atoms in this configuration)?"
                </p>
                <p className="fade-in-on-scroll mt-10">
                    Because knowing these properties helps us discover new thermoelectric meterials,
                    heat exchangers, and heat shields for spacecraft.
                </p>
                <p className="fade-in-on-scroll mt-10">
                    These materials are heavily reliant on phonon properties. These are properties
                    that are dependent on how vibrational waves pass through the material. (e.g.
                    material with high thermal conductivity means that these waves paass through the
                    material easily.)
                </p>
                <p className="fade-in-on-scroll mt-10">
                    Unfortunately, predicting these properties is computationally expensive. Here's
                    how Phononpy calculates phonon properties. First, it tiles your material into an
                    nxn supercell:
                </p>
                {/* put supercell image here */}

                <p className="fade-in-on-scroll mt-10">
                    Next, for each atom in the supercell, it needs to displace it (in each
                    dimension). It then takes this supercell (with the displacement) and calculates
                    all the forces each atom has on each other.
                </p>
                <p className="fade-in-on-scroll mt-10">
                    Once all of the forces have been calculated for all 3N displacements, it can
                    give you results on the phonon properties.
                </p>
                <p className="fade-in-on-scroll mt-10">
                    This is expensive! We have to calculate forces for each of the displacements for
                    each atom in the supercell. Taking: O((3*d^3*N)^3) time (where d^3 is the number
                    of tiled cells in the supercell, and N is the number of atoms in the primitive
                    cell).
                </p>
                <p className="fade-in-on-scroll mt-10">
                    This limitation means that there currently aren't large phonon property datasets
                    available. (It's just too expensive to create)
                </p>
                <p className="fade-in-on-scroll mt-10">
                    Fortunately, recent research have shown that phonon properties can be calculated
                    in O(NlogN) time via a neural network
                    (https://github.com/atomicarchitects/phonax)
                </p>
                <p className="fade-in-on-scroll mt-10">
                    And it works! Here's my implementation of the code using Sevennet to generate
                    the plots.
                </p>
                <p className="fade-in-on-scroll mt-10">
                    As you can see, we get more accurate results when running the calculation on
                    larger supercells. The reason why a larger supercell works is because it mimics
                    the "infinite grid" of atoms in a real material - resulting in more accurate
                    force/energy predictions.
                </p>
                <p className="fade-in-on-scroll mt-10">
                    With these neural networks, we can now create the training datasets to predict
                    these phonon properties.
                </p>
                <p className="fade-in-on-scroll mt-10">
                    The hope is that we can get 2 kinds of speedups
                </p>
                <ol className="fade-in-on-scroll list-inside list-decimal space-y-2 pl-2">
                    <li className="fade-in-on-scroll">
                        The downstream model predicts the hessian directly. So we do not need to
                        take the expensive derivatives (similar to how backward passes are
                        expensive)
                    </li>
                    <li className="fade-in-on-scroll">
                        2) The downstream model doesn't need supercells as large as the ones used by
                        the first model. (since it has a large training dataset generated by the
                        first model)
                    </li>
                </ol>
                <p className="fade-in-on-scroll mt-10">- Curtis</p>
                <div className="h-96"></div>
            </div>
        </MantineProvider>
    );
}
