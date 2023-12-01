import React from "react";
import { initAnimations, NORMAL_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";
import Link from "next/link";
import { DreamsTitle } from "@/components/dreams/DreamsTitle";
import DreamsViewer, { Dream } from "@/components/dreams/DreamViewer";

export default function Dreams() {
    React.useEffect(() => {
        return initAnimations(NORMAL_ANIMATION_TRIGGER_DECIMAL);
    }, []);

    // use https://new.express.adobe.com/tools/convert-to-mp4
    // use https://online-video-cutter.com/ to crop
    // use https://giphy.com/create to convert to gif
    const dreams = [
        {
            description: (
                <p>
                    Making a Lego Death Star with my own pieces (cause the real set was too pricy)
                </p>
            ),
            imgUrls: [
                {
                    url: "/dreams/deathstar.gif",
                    alt: "My Death Star!",
                },
            ],
        },
        {
            description: (
                <p>
                    Building a redstone calculator to honour Minecraft YouTubers I looked up to (
                    <Link
                        href="https://www.youtube.com/@Properinglish19"
                        target="_blank"
                        className="text-left underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                    >
                        Properinglish19
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="https://www.youtube.com/@bennyscube"
                        target="_blank"
                        className="text-left underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                    >
                        bennyscube
                    </Link>
                    )
                </p>
            ),
            imgUrls: [
                {
                    url: "/dreams/calculation.gif",
                    alt: "My Death Star!",
                },
            ],
        },
        {
            description: <p>Exploring far-flung college campuses with my hackathon team</p>,
            imgUrls: [
                {
                    url: "/dreams/lowkey.jpg",
                    alt: "My hackathon team!",
                },
            ],
        },
        {
            description: <p>landing my first job!</p>,
            imgUrls: [
                {
                    url: "/dreams/last-day-at-flipp.jpg",
                    alt: "My last day at Flipp",
                },
            ],
        },
        {
            description: <p>And getting into my dream school</p>,
            imgUrls: [
                {
                    url: "/dreams/waterloo-se-2023.jpg",
                    alt: "My Death Star!",
                },
            ],
        },
    ] as Dream[];

    return (
        // NOTE: <> must be used since styles are applied in a parent div
        <>
            <div className="mt-20"></div>
            <DreamsTitle />
            <p className="fade-in-on-scroll mb-2 mt-5 text-4xl">Dreams in Progress</p>
            <ul className="mx-10 list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                <li className="fade-in-on-scroll">
                    To finish sideprojects I've always wanted to finish.
                </li>
            </ul>
            <p className="fade-in-on-scroll mx-10 mb-2 mt-10 text-4xl">Dreams that Died</p>
            <ul className="mx-10 list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                <li className="fade-in-on-scroll">Starting a startup with my hackathon team</li>
                <li className="fade-in-on-scroll">Being an educational speaker on TED</li>
                <li className="fade-in-on-scroll">Reaching Grandmaster rank on Kaggle</li>
            </ul>

            <p className="fade-in-on-scroll mx-10 mb-2 mt-10 text-4xl">Dreams That Came True</p>
            <div className="mx-10">
                <DreamsViewer dreams={dreams} />
            </div>

            <p className="fade-in-on-scroll m-10 mb-2 mt-10 text-4xl">Dreams for the Future</p>
            <ul className="mx-10 list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                <li className="fade-in-on-scroll">Attend a Taylor Swift dance party</li>
                {/* <li className="fade-in-on-scroll">
                        Creating an automated system to write jokes with minimal human supervision
                    </li>
                    <ul className="ml-8 list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                        <li className="fade-in-on-scroll">
                            Much like how quant firms automate research
                        </li>
                    </ul> */}
                <li className="fade-in-on-scroll">
                    To own two dishwashers: One for clean dishes and one for dirty
                </li>
                <li className="fade-in-on-scroll">
                    To experience the other side of the fence and mentor an intern 🙂
                </li>
                {/* <li className="fade-in-on-scroll">To diverting a hurricane</li> */}
            </ul>
            <div className="h-80" />
        </>
    );
}
