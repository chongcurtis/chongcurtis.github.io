import React from "react";
import { initAnimations, NORMAL_ANIMATION_TRIGGER_DECIMAL } from "@/common/animations";

export default function Dreams() {
    React.useEffect(() => {
        return initAnimations(NORMAL_ANIMATION_TRIGGER_DECIMAL);
    }, []);

    return (
        // NOTE: <> must be used since styles are applied in a parent div
        <>
            <div className="pl-10 pr-5">
                <p className="fade-in-on-scroll mt-10 text-4xl">Dreams That Came True</p>
                <ul className="list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                    <li className="fade-in-on-scroll">
                        Making a Lego Death Star (with my own pieces cause the real set was too
                        pricy)
                    </li>
                    <li className="fade-in-on-scroll">Building a calculator in Minecraft</li>
                    <li className="fade-in-on-scroll">Getting into Soft Eng at Waterloo</li>
                    <li className="fade-in-on-scroll">Winning Hack The North</li>
                    <li className="fade-in-on-scroll">Interning for Flipp</li>
                    <li className="fade-in-on-scroll">Interning for Grammarly</li>
                </ul>
                <p className="fade-in-on-scroll mt-10 text-4xl">Dreams in Progress</p>
                <ul className="list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                    <li className="fade-in-on-scroll">Building a startup with ambitious friends</li>
                </ul>
                <p className="fade-in-on-scroll mt-10 text-4xl">Dreams that Died</p>
                <ul className="list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                    <li className="fade-in-on-scroll">
                        Starting a startup with my hackathon team: Marcel O’Neil, Daniel Wu, and
                        Kevin Shen
                    </li>
                    <li className="fade-in-on-scroll">Reaching Grandmaster rank on Kaggle</li>
                    <li className="fade-in-on-scroll">Being an educational speaker on TED</li>
                </ul>

                <p className="fade-in-on-scroll mt-10 text-4xl">Dreams for the Future</p>
                <ul className="list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                    <li className="fade-in-on-scroll">Go to a Taylor Swift dance party</li>
                    <li className="fade-in-on-scroll">
                        Creating an automated system to write jokes with minimal human supervision
                    </li>
                    <ul className="ml-8 list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                        <li className="fade-in-on-scroll">
                            Much like how quant firms automate research
                        </li>
                    </ul>
                    <li className="fade-in-on-scroll">
                        Live in a place with 2 dishwashers: One for clean dishes and one for dirty
                    </li>
                    <li className="fade-in-on-scroll">Diverting a hurricane</li>
                </ul>
                <div className="h-40" />
            </div>
        </>
    );
}
