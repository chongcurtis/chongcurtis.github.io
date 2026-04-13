import { initAnimations, NORMAL_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";
import Image from "next/image";
import React from "react";

export default function LitXBench() {
    const prevAnimation = React.useRef(null);
    React.useEffect(() => {
        return initAnimations(NORMAL_ANIMATION_TRIGGER_DECIMAL, prevAnimation);
    }, []);

    return (
        <div className="px-3 text-md">
            <p className="fade-in-on-scroll mt-20 text-center text-2xl">
                LitXBench
            </p>
            <p className="fade-in-on-scroll mt-10">
                I think that the lack of experimental materials science datasets/evals is holding the
                field back:
            </p>
            <ul className="fade-in-on-scroll list-disc space-y-2 pl-8 mt-2">
                <li className="fade-in-on-scroll">
                    It's hard to benchmark your simulation workflows without experimental data.
                </li>
                <li className="fade-in-on-scroll">
                    If you're trying to discover something novel, you need to "beat the best". But
                    how can you assign an RL reward if you don't know the true Pareto front? (This
                    matters because pretraining distributions are out of most people's control.)
                </li>
            </ul>
            <p className="fade-in-on-scroll mt-10">
                We need modestly large datasets, but scaling self-driving labs will take time.
                So in the interim, we need a method to validate computational approaches.
                One pragmatic approach to accomplishing these goals is to extract and index experiments
                from the scientific literature. This is because thousands of experiments are recorded
                in papers, and mining them is much cheaper (and scalable) than performing the
                experiments yourself, even if the measurements are noisy.
            </p>
            <p className="fade-in-on-scroll mt-10">
                The obvious approach is to use LLMs to extract experimental information into a structured
                (and indexable) data format. But I couldn't find a reliable benchmark to test my approach.
                I used a few human-annotated datasets for validation, but found that LLMs were more
                correct than my validation set. I realized that we needed a new kind of benchmark
                that properly captures the complexity of experimental data.
            </p>
            <p className="fade-in-on-scroll mt-10 text-2xl">
                What is LitXBench?
            </p>
            <p className="fade-in-on-scroll mt-6">
                It's a framework to benchmark how well we can extract experiments from papers. It also
                contains LitXAlloy, a LitXBench-based benchmark that contains manually-extracted experiments from 19 alloy papers.
                It's quite dense, with 1426 datapoints and an average of 74.8 extracted measurements per paper.
            </p>


            <p className="fade-in-on-scroll mt-6">
                We define an experiment as a set of experimentally synthesized materials,
                which we define by all their processing steps and measured properties.
            </p>
            <div className="fade-in-on-scroll mt-8 flex justify-center">
                <Image
                    // src="/materials/litxbench/material_definition.svg"
                    src="/materials/litxbench/material_definition_no_bg.svg"
                    alt="Material definition diagram"
                    width={500}
                    height={250}
                />
            </div>
            <p className="fade-in-on-scroll mt-10">
                To properly differentiate materials from each other, LitXBench solely identifies
                materials by their processing conditions, rather than by their composition.
                This is because a material can have multiple characterized compositions
                from different machines (e.g. by scale, by EDS, by XRF). It's important
                to include them all.
            </p>
            <p className="fade-in-on-scroll mt-10">
            </p>
            {/* <p className="fade-in-on-scroll mt-10">The benchmark makes three key points:</p>
            <ol className="fade-in-on-scroll list-inside list-decimal space-y-2 pl-2">
                <li className="fade-in-on-scroll">
                    When extracting properties, we should associate them not only with the
                    composition but also with the processing steps that define the material.
                </li>
                <li className="fade-in-on-scroll">
                    We need to map categorical values to canonical values to uniquely identify
                    similar values between papers.
                </li>
                <li className="fade-in-on-scroll">
                    Reliable information extraction benchmarks should be highly editable and
                    auditable.
                </li>
            </ol> */}
{/* 
            <p className="fade-in-on-scroll mt-10 text-xl font-bold">
                1. Material-Centric Property Association
            </p>
            <p className="fade-in-on-scroll mt-10">
                Most extraction workflows ask an LLM to extract experimental properties for each
                composition. But this question is ill-defined because some experiments made multiple
                samples with the same composition, but varied the processing conditions. These
                processing conditions are influential because they alter the material's atomic
                structure and can introduce varying amounts of impurities, resulting in different
                material properties.
            </p>
            <p className="fade-in-on-scroll mt-10">
                Another concern occurs when recording multiple composition measurements for each
                sample. Do you report the nominal composition (weighed by a balance) or the more
                accurate XRF measurements? Anchoring the measurements onto materials removes this
                ambiguity because you can record various composition measurements as separate values.
            </p> */}

            {/* <p className="fade-in-on-scroll mt-10 text-xl font-bold">
                2. Canonical Values Resolve Ambiguity
            </p>
            <p className="fade-in-on-scroll mt-10">
                Different authors may reference the same concept with different terms (either by
                mistake or by differing conventions). Ambiguity can also arise when properties have
                the same name, but are measured differently, for example, the fracture strain when
                measured under a tensile vs compressive test.
            </p>
            <p className="fade-in-on-scroll mt-10">
                Thus, at the time of extraction, the model needs to know what the "buckets" are to
                classify each measurement/phase/process condition, so we can normalize categorical
                values to canonical values.
            </p> */}

            <p className="fade-in-on-scroll mt-10 text-2xl">
                LitXBench Represents Extracted Materials as Code
            </p>
            {/* <div className="fade-in-on-scroll mt-8 flex justify-center">
                <Image
                    src="/materials/litxbench/code_repr.svg"
                    alt="Represent Extracted materials as Code"
                    width={500}
                    height={250}
                />
            </div> */}
            <div className="fade-in-on-scroll mt-8 flex justify-center">
                <Image
                    src="/materials/litxbench/material_obj_white.png"
                    alt="Schema for extracted material"
                    width={730}
                    height={350}
                />
            </div>
            <p className="fade-in-on-scroll mt-10">
                Why code? Because it's much more human-readable than JSON. A big reason why most annotated datasets/benchmarks
                are inaccurate is that it's hard to verify and fix errors. But code is designed to be editable and readable (unlike CSV or JSON).
            </p>
            <p className="fade-in-on-scroll mt-10">
                Another advantage is that we can use code to help us compute and normalize variables. Consider{` `}
                <a
                    href="https://www.mdpi.com/2079-6412/9/1/16"
                    target="_blank"
                    className="underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                >this paper,</a> where the authors added equiatomic Tungsten Carbide particles to a base CoCrFeNi alloy.
                The amount of these additions is equal to 10% by weight of the base alloy. The nominal composition
                they made is CoCrFeNiW<sub>0.12</sub>C<sub>0.12</sub>. But it's hard for humans to look at this and know if
                these numbers are correct! What we really need is a function to do this for us.
            </p>
            <div className="fade-in-on-scroll mt-8 flex justify-center">
                <Image
                    src="/materials/litxbench/comp_helper_fn.png"
                    alt="Schema for extracted material"
                    width={450}
                    height={250}
                />
            </div>
            <p className="fade-in-on-scroll mt-10">
                Code shifts verification away from calculating the correct composition to verifying the correctness
                of the function that performs the calculation. By making the benchmark more auditable, it becomes more trustworthy.
            </p>
            {/* <ol className="fade-in-on-scroll list-inside list-decimal space-y-2 pl-2">
                <li className="fade-in-on-scroll">
                    You miss certain values within each pass, and
                </li>
                <li className="fade-in-on-scroll">
                    You gain new insight the more you re-read the paper and adjacent papers.
                </li>
            </ol> */}
            <p className="fade-in-on-scroll mt-10">
                Code also enables validation, as compile and runtime errors teach LLMs to retry when they make mistakes. More importantly, we can perform semantic checks
                such as ensuring that: 'no alloy can depend on itself as a precursor' (no cycles in the graph).
                We can also perform checks specifically for our material class. For example, all "cut" events
                must be performed after an alloy has "cooled down". These semantic checks ensure that
                data is extracted in a consistent manner.
                {/* Code is much easier for people to edit because we inherit the type safety and syntax
                guarantees that IDEs provide. In addition, we can also perform runtime validation
                checks to ensure that the extraction makes sense. For example, when describing the
                processing conditions, all melting steps must be followed by a casting step;
                otherwise, an error will be thrown. Since LLMs are used for extraction, errors raised
                from these validation checks can help them retry until they're fixed. This is really
                useful because the errors come from the objects the LLM wrote, so the model can
                directly understand how its output caused the error. */}
            </p>
            <p className="fade-in-on-scroll mt-10">
                Code enabled LitXBench to be thoroughly reviewed for accuracy. After many hours of manual review, I also used LLMs to validate the benchmark's correctness 
                (all LLM suggestions were heavily scrutinized by humans before the benchmark was updated).
                I spent an estimated 1.1 billion Opus 4.5/4.6 tokens within Claude Code and used many more Gemini 3.1 and GPT-5.2-codex tokens to help
                catch errors. Correcting these mistakes took many hours, and it taught
                me that human-annotated datasets shouldn't be held in such high regard, as errors
                are quite common.
            </p>

            {/* <p className="fade-in-on-scroll mt-10">
                Since 18 of the papers within LitXAlloy were from the Citrine MPEA dataset, I
                cross-referenced my values with theirs and found that their dataset also contained
                mistakes. Many mistakes in LitXAlloy were also caught with LLM-assisted validation,
                with an estimated 1.1 billion Opus 4.5/4.6 tokens spent within Claude Code to flag
                errors for human scrutiny. Correcting these mistakes took many hours, and it taught
                me that human-annotated datasets shouldn't be placed in such high regard, as errors
                are quite common.
            </p> */}
            {/* <p className="fade-in-on-scroll mt-10">
                Since errors are unavoidable, we need strong guardrails to fix errors and teach
                future readers the reasoning behind extracted values.
            </p> */}

            {/* <h3 className="fade-in-on-scroll mt-10 text-2xl">
                Information Extraction Benchmarks Should be Recorded in Code
            </h3>
            <p className="fade-in-on-scroll mt-10">
                We go into more detail in the paper, but as shown in the image, materials are much
                easier to understand when laid out in code than when expressed in JSON or CSV.
            </p> */}

            {/* <p className="fade-in-on-scroll mt-10 text-2xl">
                Code Enables Validation
            </p> */}
            {/* <p className="fade-in-on-scroll mt-10">
                Often, papers leave out details, which require nontrivial amounts of inference from
                the reader to understand - especially if there are mistakes in the paper. For
                benchmarks like LitXAlloy, where the truth is ambiguous or contested between multiple
                annotators, code comments can serve as evidence/documentation for why specific values
                were extracted.
            </p> */}

            <h3 className="fade-in-on-scroll mt-10 text-2xl">
                Results
            </h3>
            <p className="fade-in-on-scroll mt-10">
                Further results and experiments are in{` `}
                <a
                    href="https://arxiv.org/pdf/2604.07649"
                    target="_blank"
                    className="underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                >the paper,</a> but here are the results of frontier
                LLMs on LitXAlloy:
            </p>
            <div className="fade-in-on-scroll mt-8 flex justify-center">
                <Image
                    src="/materials/litxbench/comp_helper_fn.png"
                    alt="Schema for extracted material"
                    width={450}
                    height={250}
                />
            </div>

            <p className="fade-in-on-scroll mt-10">
                Overall, LLMs are proficient at experiment extraction, but more work is needed before
                experimental data is truly reliable. I'm just glad that we now have a quantifiable
                metric for "extraction error". I hope LitXBench will be used to create novel,
                meaningful datasets/benchmarks that don't currently exist.
            </p>
            <p className="fade-in-on-scroll mt-10">- Curtis</p>
            <div className="h-96"></div>
        </div>
    );
}
