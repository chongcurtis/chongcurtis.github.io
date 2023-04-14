export default function MailchimpSignup() {


// I'm not using the css file at. I ran into too many issues https://cdn-images.mailchimp.com/embedcode/classic-071822.css
// I'm also not using the validation code at https://s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js
    return (
        <div
            className="fadeIn relative border border-gray-300 px-50 py-1 rounded-lg bg-gray-100 ">

            {/*Begin Mailchimp Signup Form*/}
            <div id="mc_embed_signup" className="w-full">
                <form
                    action="https://chongcurtis.us19.list-manage.com/subscribe/post?u=dcb9ac87ea46a1ce8616c58f5&amp;id=143adbb116&amp;f_id=008eb1e4f0"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate"
                    target="_blank" noValidate>
                    <div id="mc_embed_signup_scroll" className="flex flex-row p-5">
                        <div className="flex-1">
                            <input type="email" defaultValue="" name="EMAIL"
                                   className="bg-transparent border-b-[1px] border-b-gray-300 text-slate-800 focus:outline-none w-full required email"
                                   id="mce-EMAIL" placeholder="john.doe@gmail.com" required />
                        </div>
                        {/*real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                        <div className="absolute -left-[6000px]" aria-hidden="true">
                            <input type="text" placeholder="small input placed super far away"
                                   name="b_dcb9ac87ea46a1ce8616c58f5_143adbb116" tabIndex={-1} defaultValue="" />
                        </div>
                        <div className="flex-1 flex-grow-0 flex-shrink-0 ml-2">
                            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                                   className="bg-gray-200 border border-gray-300 hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer text-black ml-15 rounded-md px-2 py-1 text-xs button" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}