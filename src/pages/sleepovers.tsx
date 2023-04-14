// import './sleepovers.css'

import ThinLine from "@/components/ThinLine";
import MailchimpSignup from "@/components/MailchimpSignup";


// from https://cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css
const mailchimpCss = `
/* MailChimp Form Embed Code - Horizontal Super Slim - 12/16/2015 v10.7
Adapted from: http://blog.heyimcat.com/universal-signup-form/ */

#mc_embed_signup form {text-align:center; padding:10px 0 10px 0;}
.mc-field-group { display: inline-block; } /* positions input field horizontally */
#mc_embed_signup input.email {font-family:"Open Sans","Helvetica Neue",Arial,Helvetica,Verdana,sans-serif; font-size: 15px; border: 1px solid #ABB0B2;  -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; color: #343434; background-color: #fff; box-sizing:border-box; height:32px; padding: 0px 0.4em; display: inline-block; margin: 0; width:350px; vertical-align:top;}
#mc_embed_signup label {display:block; font-size:16px; padding-bottom:10px; font-weight:bold;}
#mc_embed_signup .clear {display: inline-block;} /* positions button horizontally in line with input */
#mc_embed_signup .button {font-size: 13px; border: none; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; letter-spacing: .03em; color: #fff; background-color: #aaa; box-sizing:border-box; height:32px; line-height:32px; padding:0 18px; display: inline-block; margin: 0; transition: all 0.23s ease-in-out 0s;}
#mc_embed_signup .button:hover {background-color:#777; cursor:pointer;}
#mc_embed_signup div#mce-responses {float:left; top:-1.4em; padding:0em .5em 0em .5em; overflow:hidden; width:90%;margin: 0 5%; clear: both;}
#mc_embed_signup div.response {margin:1em 0; padding:1em .5em .5em 0; font-weight:bold; float:left; top:-1.5em; z-index:1; width:80%;}
#mc_embed_signup #mce-error-response {display:none;}
#mc_embed_signup #mce-success-response {color:#529214; display:none;}
#mc_embed_signup label.error {display:block; float:none; width:auto; margin-left:1.05em; text-align:left; padding:.5em 0;}
@media (max-width: 768px) {
    #mc_embed_signup input.email {width:100%; margin-bottom:5px;}
    #mc_embed_signup .clear {display: block; width: 100% }
    #mc_embed_signup .button {width: 100%; margin:0; }
}

/* My styles */
#mc_embed_signup{ clear: left; font:14px Helvetica,Arial,sans-serif; width:100%}
`;
export default function Sleepovers() {
    // I really like this font: segoe ui
    return (
        <div className="flex relative flex-col">
            <style
                dangerouslySetInnerHTML={{
                    __html: mailchimpCss,
                }}
            />
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
                    </div>
                </div>
            </div>
            <MailchimpSignup />
        </div>
    );
}