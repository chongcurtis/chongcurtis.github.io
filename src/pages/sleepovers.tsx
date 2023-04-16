// import './sleepovers.css'

import ThinLine from "@/components/ThinLine";
import MailchimpSignup from "@/components/MailchimpSignup";
import sleepoversBanner from "public/sleepovers/sleepovers-banner.jpg";
import React from "react";

type Animation = {
    initialClass: string;
    finalClass: string;
};

export default function Sleepovers() {
    const fadeInAnimation = {
        initialClass: "fade-in-on-scroll",
        finalClass: "faded-in",
    };
    const expandAnimation = {
        initialClass: "expand-on-scroll",
        finalClass: "expanded",
    };

    React.useEffect(() => {
        const tryStartAnimations = () => {
            const noMoreFadeIns = tryStartAnimation(fadeInAnimation);
            const noMoreExpands = tryStartAnimation(expandAnimation);
            // DO NOT put join the two functions in this if statement with a && cause of early return, the later ones won't run
            if (noMoreFadeIns && noMoreExpands) {
                // All elements have faded in. So remove handler to save computation
                window.removeEventListener("scroll", tryStartAnimations);
            }
        };
        setTimeout(tryStartAnimations, 100);
        window.addEventListener("scroll", tryStartAnimations);
        return () => {
            window.removeEventListener("scroll", tryStartAnimations);
        };
    }, []);

    // returns a boolean, indicating that we are done starting all animations
    const tryStartAnimation = (animation: Animation): boolean => {
        // I am using querySelectorAll since getElementsByClassName doesn't return all elements
        // Why? it's cause getElementsByClassName returns a live collection: https://stackoverflow.com/a/31311967/4647924
        const elements = document.querySelectorAll(`.${animation.initialClass}`);
        if (elements.length === 0) {
            return true;
        }

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i] as HTMLElement;
            const elementTop = element.offsetTop;
            if (elementTop <= window.scrollY + (window.innerHeight * 7) / 8) {
                element.classList.add(animation.finalClass);
                element.classList.remove(animation.initialClass);
            }
        }
        return false;
    };

    return (
        <div className="align-center mx-auto flex max-w-3xl flex-col place-items-center justify-center">
            <div className="fade-in-on-scroll relative mt-20 max-w-2xl text-center text-3xl">
                <img src={sleepoversBanner.src} alt="Sleepovers at the Office" />

                {/* Nextjs optimizes the image. However, it decreases the saturation of the colors. So for this img.
                To disable saturation, unoptimized needs to be true, but I don't think it offers any advantages now.
                 So I'm using the <img> tag */}
                {/*<Image src={sleepoversBanner.src} alt="Sleepovers at the Office" width={600} height={600}*/}
                {/*       quality={100}*/}
                {/*       unoptimized={true}*/}
                {/*/>*/}
            </div>
            <p className="fade-in-on-scroll mt-10 px-2 text-center text-2xl text-sleepover-primary">
                Projects Ideas to Bring up at Slumber Parties
            </p>
            <div className="fade-in-on-scroll mt-5 text-center text-gray-400">
                View past issues{" "}
                <a
                    className="border-b-2 border-sleepover-secondary text-sleepover-secondary no-underline transition duration-300 ease-in-out hover:border-sleepover-primary hover:text-sleepover-primary"
                    href="https://github.com/curtischong/Sleepovers-at-the-Office"
                >
                    here
                </a>
            </div>

            {/* Important! setting w-full makes it fill the full width of max-2-2xl */}
            {/* Also, the px-5 is so it doesn't touch the edge of the screen on mobile */}
            <div className="fade-in-on-scroll mb-10 mt-10 w-full max-w-2xl px-5">
                <MailchimpSignup />
            </div>

            <div className="px-5">
                <div>
                    <p className="fade-in-on-scroll">Hello!</p>
                    <br />
                    <br />
                    <p className="fade-in-on-scroll">
                        Sleepovers at the Office is my weekly newsletter. It&apos;s a collection of
                        tech-related project ideas that I send out every Monday.
                    </p>
                    <br />
                    <br />
                    <p className="fade-in-on-scroll">
                        There are many reasons why I wanted to start this newsletter, but the
                        largest one is that I want to see these ideas come true. I can&apos;t work
                        on every project, but I hope someone reading this can.
                    </p>
                    <br />
                    <br />
                    <p className="fade-in-on-scroll text-xl text-sleepover-primary">
                        Why is it called Sleepovers at the Office?
                    </p>
                    <br />
                    <p className="fade-in-on-scroll">
                        When the Coronavirus came, the CEO at Lumina graciously allowed me to stay
                        at the office to shelter from the disease. I was without words when they
                        offered me a place to stay, so I decided to name my newsletter after what
                        happened.
                    </p>
                    <br />
                    <ThinLine />
                    <p className="fade-in-on-scroll mt-2">
                        Here&apos;s what an email might look like:
                    </p>
                    <div className="fade-in flex">
                        <div className="fade-in-on-scroll mt-10 border-l-4 border-l-slate-100 pl-4 text-slate-800 sm:border-l-8 sm:pl-6">
                            <div>
                                <p className="fade-in-on-scroll text-3xl">
                                    Technology to Divert Hurricanes
                                </p>
                                <div className="mt-1 flex items-center justify-start">
                                    <p className="mr-2 text-xl text-sleepover-primary">
                                        Sleepovers at the Office
                                    </p>
                                    <p className="text-md text-sleepover-secondary">• Idea #98</p>
                                </div>
                            </div>
                            <br />
                            <br />
                            <p className="fade-in-on-scroll">Hurricanes suck.</p>
                            <br />
                            <br />
                            <p className="fade-in-on-scroll">
                                What if we could redirect them so that instead of hitting Florida,
                                they remain in the Atlantic before dying off?
                            </p>
                            <br />
                            <br />
                            <p className="fade-in-on-scroll">Here&apos;s how we might do it:</p>
                            <ol className="mb-6 ml-[20px] mt-4 list-decimal marker:text-center marker:font-extrabold marker:text-slate-800">
                                <li className="fade-in-on-scroll mb-2 pl-2">
                                    Predict where/when a storm will form.
                                </li>
                                <li className="fade-in-on-scroll mb-2 pl-2">
                                    Send a fleet of 50 planes near that area. They will create
                                    clouds to reflect sunlight and change the temperature of the
                                    water below.
                                </li>
                                <li className="fade-in-on-scroll mb-2 pl-2">
                                    This change in atmosphere will deviate the storm from its
                                    initial path, saving billions of dollars of damage.
                                </li>
                            </ol>
                            <br />
                            <p className="fade-in-on-scroll">
                                The hard part is telling the planes where to fly. We&apos;ll need
                                the following:
                            </p>
                            <ul className="mb-6 ml-[20px] mt-4 list-disc marker:text-center marker:font-extrabold marker:text-slate-800">
                                <li className="fade-in-on-scroll mb-2 pl-2">
                                    A model to predict the storm&apos;s future trajectory given the
                                    current measurements.
                                </li>
                                <li className="fade-in-on-scroll mb-2 pl-2">
                                    A reinforcement learning algorithm (Monte Carlo tree search?) to
                                    determine the best locations to &ldquo;remove heat&rdquo; and
                                    redirect the storm away from people.
                                </li>
                            </ul>
                            <br />
                            <p className="fade-in-on-scroll">
                                It&apos;d be breathtaking to see aircraft carriers launch hundreds
                                of jets to redirect the tempest.
                            </p>
                            <br />
                            <br />
                            <p className="fade-in-on-scroll">
                                We may not even need planes to fly; autonomous drones could be
                                enough. Since this is a control problem, we&apos;ll need extremely
                                responsive agents, i.e. computers.
                            </p>
                            <br />
                            <br />
                            <p className="fade-in-on-scroll">
                                On the other hand, this technology may encourage more development in
                                hazardous areas because people may falsely assume that this
                                technology will work all the time. There are also ethical concerns.
                                If you can redirect storms away from people, you certainly have the
                                means to direct them toward people…
                            </p>
                            <br />
                            <br />
                            <p className="fade-in-on-scroll">
                                Concerns aside, I need to find out if this fiction is the future. I
                                hope it is because it feels like a fun problem to solve. I wish you
                                the best of weeks!
                            </p>
                            <br />
                            <br />
                            <p className="fade-in-on-scroll">- Curtis</p>
                        </div>
                    </div>
                </div>
            </div>

            <p className="fade-in-on-scroll mt-8 px-5 text-center text-lg text-sleepover-primary">
                Thank you so much for reading that and I hope to land in your inbox!
            </p>
            {/*Important! setting w-full makes it fill the full width of max-2-2xl */}
            <div className="fade-in-on-scroll mb-[250px] mt-6 w-full max-w-2xl px-5">
                <MailchimpSignup />
            </div>
        </div>
    );
}
