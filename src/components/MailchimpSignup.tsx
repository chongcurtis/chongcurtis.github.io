export default function MailchimpSignup() {

    return (
        <div
            className="fadeIn relative border border-gray-300 mx-auto mt-40 mb-70 p-30 pt-20 rounded-lg bg-gray-100 w-600">
            {/*Begin Mailchimp Signup Form -*/}
            <div id="mc_embed_signup" className="background-color: #f0f0f0;">
                <form className="background-color: #f0f0f0; validate"
                      action="https://chongcurtis.us19.list-manage.com/subscribe/post?u=dcb9ac87ea46a1ce8616c58f5&amp;id=143adbb116"
                      method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"
                      target="_blank"
                      noValidate>
                    <div id="mc_embed_signup_scroll" className="background-color: #f0f0f0;">
                        <input type="email"
                               className="bg-[#f0f0f0] border-0 border-b-1 border-b-gray-800 text-slate-800 email"
                               value="" name="EMAIL" id="mce-EMAIL" placeholder="john.doe@gmail.com" required />
                        {/*real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                        <div className="position: absolute; left: -5000px; background-color: #f0f0f0"
                             aria-hidden="true">
                            <input type="text" name="b_dcb9ac87ea46a1ce8616c58f5_143adbb116" tabIndex={-1}
                                   value="" />
                        </div>
                        <div className="clear background-color: #f0f0f0;">
                            {/*
                                style="background-color: #e3e3e3; border: 1px solid rgba(180, 180, 180); color: black; margin-left: 15px;"
                                */}
                            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe;"
                                   className="button submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}