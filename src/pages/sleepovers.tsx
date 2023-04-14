// import './sleepovers.css'

import ThinLine from "@/components/ThinLine";
import MailchimpSignup from "@/components/MailchimpSignup";

export default function Sleepovers() {
    // I really like this font: segoe ui
    return (
        <div className="flex relative flex-col">
            <link href="https://cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet"
                  type="text/css" />
            <style type="text/css">
                {/*#mc_embed_signup{ clear: left; font:14px Helvetica,Arial,sans-serif; width:100%}*/}
                {/*Add your own Mailchimp form style overrides in your site stylesheet or in this style block.*/}
                {/*We recommend moving this block and the preceding CSS link to the HEAD of your HTML file.*/}
            </style>
            <div className="fadeIn relative text-3xl text-center mt-20">
                <h1 className="text-sleepover-primary text-2xl"> Sleepovers at the Office</h1>
            </div>
            <div className="fadeIn text-sleepover-secondary text-center text-sm">Projects Ideas to Talk About at Slumber
                Parties
            </div>
            <div className="fadeIn text-[#757575] text-center">
                View past issues <a className="text-[#ff947d] no-underline border-b-2 border-orange-500"

                                    href="https://github.com/curtischong/Sleepovers-at-the-Office">here</a>
            </div>

            <MailchimpSignup />

            <div className="flex justify-center ">
                <div className="content-center max-w-md">
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
                        <MailchimpSignup />
                    </div>
                </div>
            </div>
        </div>
    );
}