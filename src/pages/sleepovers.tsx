// import './sleepovers.css'

import ThinLine from "@/components/ThinLine";
import MailchimpSignup from "@/components/MailchimpSignup";
import sleepoversBanner from "public/sleepovers/sleepovers-banner.jpg";


export default function Sleepovers() {
    // I really like this font: segoe ui
    return (
        <div className="flex flex-col justify-center align-center max-w-3xl place-items-center mx-auto">
            <div className="fadeIn relative text-3xl text-center mt-20 max-w-2xl">
                <img src={sleepoversBanner.src} alt="Sleepovers at the Office" />

                {/* Nextjs optimizes the image. However, it decreases the saturation of the colors. So for this img.
                To disable saturation, unoptimized needs to be true, but I don't think it offers any advantages now.
                 So I'm using the <img> tag */}
                {/*<Image src={sleepoversBanner.src} alt="Sleepovers at the Office" width={600} height={600}*/}
                {/*       quality={100}*/}
                {/*       unoptimized={true}*/}
                {/*/>*/}
            </div>
            <p className="fadeIn text-sleepover-primary text-center text-2xl mt-10 px-2">
                Projects Ideas to Bring up at Slumber Parties
            </p>
            <div className="fadeIn text-gray-400 text-center mt-5">
                View past issues <a
                className="text-sleepover-secondary no-underline border-b-2 border-sleepover-secondary hover:border-sleepover-primary hover:text-sleepover-primary transition duration-300 ease-in-out"
                href="https://github.com/curtischong/Sleepovers-at-the-Office">here</a>
            </div>

            {/* Important! setting w-full makes it fill the full width of max-2-2xl */}
            {/* Also, the px-5 is so it doesn't touch the edge of the screen on mobile */}
            <div className="mt-10 mb-10 w-full max-w-2xl px-5">
                <MailchimpSignup />
            </div>

            <div className="px-5">
                <p className="fadeIn"></p>
                <div>
                    Hello!
                    <br />
                    <br />
                    <p>Sleepovers at the Office is my weekly newsletter. It&apos;s a collection of tech-related
                        project
                        ideas that I send out every Monday.</p>
                    <br />
                    <br />
                    <p>
                        There are many reasons why I wanted to start this newsletter, but the largest one is that I want
                        to see these ideas come true. I can&apos;t work on every project, but I hope someone reading
                        this can.
                    </p>
                    <br /><br />
                    <p className="text-sleepover-primary text-xl">Why is it called Sleepovers at the Office?</p>
                    <br />
                    When the Coronavirus came, the CEO at Lumina graciously allowed me to stay at the office to
                    shelter from the disease. I was without words when they offered me a place to stay, so I decided to
                    name my newsletter after what happened.
                    <br />
                    <ThinLine />
                    <p className="fadeIn mt-2">Here&apos;s what an email might look like:</p>
                    <div className="flex fadeIn">
                        {/*
                    height: 295px;
                    width: 10px;
                    background-color: #cfcfcf;
                    margin: 20px;
                    */}
                        {/*TODO: add title*/}
                        {/*<div id="quoteBar"></div>*/}
                        <div className="text-slate-800 mt-10 border-l-8 border-l-slate-100 pl-6">
                            <p className="text-3xl">Technology to Divert Hurricanes</p>
                            <div className="flex items-center justify-start">
                                <p className="text-xl text-sleepover-primary mr-2">Sleepovers at the Office</p>
                                <p className="text-md text-sleepover-secondary">• Idea #98</p>
                            </div>
                            <br />
                            <br />
                            Hurricanes suck.
                            <br />
                            <br />
                            What if we could redirect them so that instead of hitting Florida, they remain in the
                            Atlantic before dying off?
                            <br />
                            <br />
                            Here&apos;s how we might do it:
                            <ol className="list-decimal ml-[20px] mt-4 mb-6 marker:font-extrabold marker:text-slate-800 marker:text-center">
                                <li className="mb-2 pl-2">Predict where/when a storm will form.</li>
                                <li className="mb-2 pl-2">Send a fleet of 50 planes near that area. They will create
                                    clouds
                                    to reflect
                                    sunlight
                                    and change the temperature of the water below.
                                </li>
                                <li className="mb-2 pl-2">This change in atmosphere will deviate the storm from its
                                    initial
                                    path, saving
                                    billions
                                    of dollars of damage.
                                </li>
                            </ol>
                            The hard part is telling the planes where to fly. We&apos;ll need the following:
                            <ul className="list-disc ml-[20px] mt-4 mb-6 marker:font-extrabold marker:text-slate-800 marker:text-center">
                                <li className="mb-2 pl-2">
                                    A model to predict the storm&apos;s future trajectory given the current
                                    measurements.
                                </li>
                                <li className="mb-2 pl-2">
                                    A reinforcement learning algorithm (Monte Carlo tree search?) to determine the best
                                    locations to &ldquo;remove heat&rdquo; and redirect the storm away from people.
                                </li>
                            </ul>
                            It&apos;d be breathtaking to see aircraft carriers launch hundreds of jets to redirect
                            the tempest.
                            <br />
                            <br />
                            We may not even need planes to fly; autonomous drones could be enough. Since this is a
                            control problem, we&apos;ll need extremely responsive agents, i.e. computers.
                            <br />
                            <br />
                            On the other hand, this technology may encourage more development in hazardous areas because
                            people may falsely assume that this technology will work all the time. There are also
                            ethical concerns. If you can redirect storms away from people, you certainly have the means
                            to direct them toward people…
                            <br />
                            <br />
                            Concerns aside, I need to find out if this fiction is the future. I hope it is because it
                            feels like a fun problem to solve. I hope you have a great week!
                            <br />
                            <br />
                            - Curtis
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-sleepover-primary mt-8 text-lg">I hope to see you every Monday!</p>
            {/*Important! setting w-full makes it fill the full width of max-2-2xl */}
            <div className="mt-6 mb-[250px] w-full max-w-2xl px-5">
                <MailchimpSignup />
            </div>
        </div>
    );
}