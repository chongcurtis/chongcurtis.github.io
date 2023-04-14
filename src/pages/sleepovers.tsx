// <link href="https://cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
// <style type="text/css">
//     #mc_embed_signup{ clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}
//     /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
//     We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
// </style>
export default function Sleepovers() {
    // I really like this font: segoe ui
    return (<div id="bodyCon">
            <div id="title" className="fadeIn">
                <h1 id="titlep">Sleepovers at the Office</h1>
            </div>
            <div id="subtitle" className="fadeIn">Projects Ideas to Talk About at Slumber Parties</div>
            <div id="subtitle2" className="fadeIn">View past issues <a id="archiveLink"
                                                                       href="https://github.com/curtischong/Sleepovers-at-the-Office">here</a>
            </div>

            <div id="signupCon" className="fadeIn">
                {/*Begin Mailchimp Signup Form -*/}
                <div id="mc_embed_signup" className="background-color: #f0f0f0;">
                    <form className="background-color: #f0f0f0; validate"
                          action="https://chongcurtis.us19.list-manage.com/subscribe/post?u=dcb9ac87ea46a1ce8616c58f5&amp;id=143adbb116"
                          method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                          target="_blank"
                          noValidate>
                        <div id="mc_embed_signup_scroll" className="background-color: #f0f0f0;">
                            <input type="email"
                                   className="background-color: #f0f0f0; border: 0px; border-bottom: 1px solid rgba(180, 180, 180); border-radius: 0px; color: black; email"
                                   value="" name="EMAIL" id="mce-EMAIL" placeholder="john.doe@gmail.com" required/>
                            {/*real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                            <div className="position: absolute; left: -5000px; background-color: #f0f0f0"
                                 aria-hidden="true">
                                <input type="text" name="b_dcb9ac87ea46a1ce8616c58f5_143adbb116" tabIndex={-1}
                                       value=""/>
                            </div>
                            <div className="clear background-color: #f0f0f0;">
                                {/*
                                style="background-color: #e3e3e3; border: 1px solid rgba(180, 180, 180); color: black; margin-left: 15px;"
                                */}
                                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe;"
                                       className="button submit"/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <p id="intro4" className="fadeIn">Hello!</p>
            <div>
                <br/><br/>
                <p>Sleepovers at the Office is my weekly newsletter. It&apos;s a collection of tech-related project
                    ideas
                    that I
                    send out every Monday.</p>
                <br/><br/><br/>
                There are many reasons why I wanted to start this newsletter, but the largest one is that I want to see
                these ideas come true, I can&apos;t possibly work on every project idea that comes by, so hopefully
                someone
                will
                turn one
                into reality someday.
                <br/><br/><br/>
                Why is it called Sleepovers at the Office?
                <br/><br/>
                When the Coronavirus came, the CEO at Lumina gratiously allowed me to stay at the office to shelter from
                the
                disease.
                I was without words when they offered me a place to stay so I decided to name my newsletter after what
                happened.
                <br/>
                <hr className="splitHr fadeIn"/>
                <p id="secondP2" className="fadeIn">Here&apos;s what an email might look like:</p>
                <div id="example" className="fadeIn">
                    <div id="quoteBar"></div>
                    <div id="quoteText" className="lightText">
                        Finding your smash-hit song on Spotify&apos;s &ldquo;Discover Weekly&rdquo; page is hard. It
                        takes
                        me around an
                        hour to get through it :/
                        <br/>
                        <br/>
                        What if we can represent songs as gifs, then display all 30 gifs onto a page.
                        Once we learn how songs &ldquo;look like&rdquo; we&apos;ll be able to quickly veto bad songs.
                        <br/><br/>
                        What you&apos;ll probably need to make this:
                        <ul>
                            <li className="lightText">An encoder/decoder network to get compressed song vectors.</li>
                            <li className="lightText">A way to map song vectors onto images.</li>
                            <li className="lightText">An algorithm to structure the generated image.</li>
                        </ul>
                        Or you can just learn how to read spectrograms.
                        <br/>
                        <br/>
                        - Curtis
                    </div>
                </div>

                <div id="signupCon" className="fadeIn">
                    {/*Begin Mailchimp Signup Form -*/}
                    <div id="mc_embed_signup" className="background-color: #f0f0f0;">
                        <form className="background-color: #f0f0f0; validate"
                              action="https://chongcurtis.us19.list-manage.com/subscribe/post?u=dcb9ac87ea46a1ce8616c58f5&amp;id=143adbb116"
                              method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                              target="_blank" noValidate>
                            <div id="mc_embed_signup_scroll" className="background-color: #f0f0f0;">
                                <input type="email"
                                       className="background-color: #f0f0f0; border: 0px; border-bottom: 1px solid rgba(180, 180, 180); border-radius: 0px; color: black; email"
                                       value="" name="EMAIL" id="mce-EMAIL" placeholder="john.doe@gmail.com" required/>
                                {/*real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                                <div className="position: absolute; left: -5000px; background-color: #f0f0f0"
                                     aria-hidden="true">
                                    <input type="text" name="b_dcb9ac87ea46a1ce8616c58f5_143adbb116" tabIndex={-1}
                                           value=""/>
                                </div>
                                <div className="clear background-color: #f0f0f0;">
                                    {/*
                                style="background-color: #e3e3e3; border: 1px solid rgba(180, 180, 180); color: black; margin-left: 15px;"
                                */}
                                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe;"
                                           className="button submit"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}