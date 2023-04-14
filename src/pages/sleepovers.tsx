// import './sleepovers.css'

import ThinLine from "@/components/ThinLine";
import MailchimpSignup from "@/components/MailchimpSignup";
import sleepoversBanner from "public/sleepovers/sleepovers-banner.jpg";
import Image from "next/image";


export default function Sleepovers() {
    // I really like this font: segoe ui
    return (
        <div className="flex flex-col justify-center align-center max-w-3xl place-items-center mx-auto">
            <div className="fadeIn relative text-3xl text-center mt-20 max-w-xl">
                {/*<img src={sleepoversBanner.src} alt="Sleepovers at the Office" />*/}
                <Image src={sleepoversBanner.src} alt="Sleepovers at the Office" width={1000} height={1000} />
            </div>
            <h3 className="fadeIn text-sleepover-secondary text-center text-sm">
                Projects Ideas to Talk About at Slumber Parties
            </h3>
            <div className="fadeIn text-[#757575] text-center">
                View past issues <a className="text-[#ff947d] no-underline border-b-2 border-orange-500"

                                    href="https://github.com/curtischong/Sleepovers-at-the-Office">here</a>
            </div>

            {/* Important! setting w-full makes it fill the full width of max-2-2xl */}
            {/* Also, the px-5 is so it doesn't touch the edge of the screen on mobile */}
            <div className="mt-10 mb-10 w-full max-w-2xl px-5">
                <MailchimpSignup />
            </div>

            <div className="px-5">
                <p className="fadeIn">Hello!</p>
                <div>
                    <br /><br />
                    <p>Sleepovers at the Office is my weekly newsletter. It&apos;s a collection of tech-related
                        project
                        ideas that I send out every Monday.</p>
                    <br /><br /><br />
                    <p>
                        There are many reasons why I wanted to start this newsletter, but the largest one is that I
                        want
                        to see these ideas come true, I can&apos;t possibly work on every project idea that comes
                        by, so
                        hopefully someone will turn one into reality someday.
                    </p>
                    <br /><br /><br />
                    Why is it called Sleepovers at the Office?
                    <br /><br />
                    When the Coronavirus came, the CEO at Lumina gratiously allowed me to stay at the office to
                    shelter
                    from
                    the disease. I was without words when they offered me a place to stay so I decided to name my
                    newsletter
                    after what happened.
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
                        {/*<div id="quoteBar"></div>*/}
                        <div className="text-slate-800 mt-20">
                            Finding your smash-hit song on Spotify&apos;s &ldquo;Discover Weekly&rdquo; page is
                            hard. It
                            takes me around an hour to get through it :/
                            <br />
                            <br />
                            What if we can represent songs as gifs, then display all 30 gifs onto a page.
                            Once we learn how songs &ldquo;look like&rdquo; we&apos;ll be able to quickly veto bad
                            songs.
                            <br /><br />
                            What you&apos;ll probably need to make this:
                            <ul>
                                <li>An encoder/decoder network to get compressed song vectors.</li>
                                <li>A way to map song vectors onto images.</li>
                                <li>An algorithm to structure the generated image.</li>
                            </ul>
                            Or you can just learn how to read spectrograms.
                            <br />
                            <br />
                            - Curtis
                        </div>
                    </div>
                </div>
            </div>
            {/*Important! setting w-full makes it fill the full width of max-2-2xl */}
            <div className="mt-10 mb-[250px] w-full max-w-2xl px-5">
                <MailchimpSignup />
            </div>
        </div>
    );
}