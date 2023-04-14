export default function MailchimpSignup() {


// from https://cdn-images.mailchimp.com/embedcode/classic-071822.css
    const mailchimpCss = `
/* MailChimp Form Embed Code - Classic - 12/17/2015 v10.7 */
#mc_embed_signup form {display:block; position:relative; text-align:left; margin: 20px}
#mc_embed_signup h2 {font-weight:bold; padding:0; margin:15px 0; font-size:1.4em;}

/* Commented cause I don't like the default styles*/
/*#mc_embed_signup input {border: 1px solid #ABB0B2; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px;}*/

#mc_embed_signup input[type=checkbox]{-webkit-appearance:checkbox;}
#mc_embed_signup input[type=radio]{-webkit-appearance:radio;}

/* Commented cause I don't like the default styles*/
/*#mc_embed_signup input:focus {border-color:#333;}*/

#mc_embed_signup .button {clear:both; background-color: #aaa; border: 0 none; border-radius:4px; transition: all 0.23s ease-in-out 0s; color: #FFFFFF; cursor: pointer; display: inline-block; font-size:15px; font-weight: normal; height: 32px; line-height: 32px; margin: 0 5px 10px 0; padding: 0 22px; text-align: center; text-decoration: none; vertical-align: top; white-space: nowrap; width: fit-content; width: -moz-fit-content;}
#mc_embed_signup .button:hover {background-color:#777;}
#mc_embed_signup .small-meta {font-size: 11px;}
#mc_embed_signup .nowrap {white-space:nowrap;}

#mc_embed_signup .mc-field-group {clear:left; position:relative; width:96%; padding-bottom:3%; min-height:50px; display:grid;}
#mc_embed_signup .size1of2 {clear:none; float:left; display:inline-block; width:46%; margin-right:4%;}
* html #mc_embed_signup .size1of2 {margin-right:2%; /* Fix for IE6 double margins. */}
#mc_embed_signup .mc-field-group label {display:block; margin-bottom:3px;}
#mc_embed_signup .mc-field-group input {display:block; width:100%; padding:8px 0; text-indent:2%;}
#mc_embed_signup .mc-field-group select {display:inline-block; width:99%; padding:5px 0; margin-bottom:2px;}
#mc_embed_signup .mc-address-fields-group {display:flex; flex-direction:row; justify-content:space-evenly; width:96%; gap:15px;}

#mc_embed_signup .datefield, #mc_embed_signup .phonefield-us{padding:5px 0;}
#mc_embed_signup .datefield input, #mc_embed_signup .phonefield-us input{display:inline; width:60px; margin:0 2px; letter-spacing:1px; text-align:center; padding:5px 0 2px 0;}
#mc_embed_signup .phonefield-us .phonearea input, #mc_embed_signup .phonefield-us .phonedetail1 input{width:40px;}
#mc_embed_signup .datefield .monthfield input, #mc_embed_signup .datefield .dayfield input{width:30px;}
#mc_embed_signup .datefield label, #mc_embed_signup .phonefield-us label{display:none;}

#mc_embed_signup .indicates-required {text-align:right; font-size:11px; margin-right:4%;}
#mc_embed_signup .asterisk {color:#e85c41; font-size:150%; font-weight:normal; position:relative; top:5px;}     
#mc_embed_signup .clear {clear:both;}
#mc_embed_signup .foot {display:grid; grid-template-columns: 3fr 1fr; width:96%; align-items: center;}
@media screen and (max-width:400px) {#mc_embed_signup .foot {display:grid; grid-template-columns: 1fr; width:100%; align-items: center;}}

@media screen and (max-width:400px) {#mc_embed_signup .referralBadge {width:50%;}}

#mc_embed_signup .brandingLogo {justify-self:right;}
@media screen and (max-width:400px) {#mc_embed_signup .brandingLogo {justify-self:left;}}

#mc_embed_signup .mc-field-group.input-group ul {margin:0; padding:5px 0; list-style:none;}
#mc_embed_signup .mc-field-group.input-group ul li {display:block; padding:3px 0; margin:0;}
#mc_embed_signup .mc-field-group.input-group label {display:inline;}
#mc_embed_signup .mc-field-group.input-group input {display:inline; width:auto; border:none;}

#mc_embed_signup div#mce-responses {float:left; top:-1.4em; padding:0em .5em 0em .5em; overflow:hidden; width:90%; margin: 0 5%; clear: both;}
#mc_embed_signup div.response {margin:1em 0; padding:1em .5em .5em 0; font-weight:bold; float:left; top:-1.5em; z-index:1; width:80%;}
#mc_embed_signup #mce-error-response {display:none;}
#mc_embed_signup #mce-success-response {color:#529214; display:none;}
#mc_embed_signup label.error {display:block; float:none; width:auto; margin-left:1.05em; text-align:left; padding:.5em 0;}

#mc-embedded-subscribe {clear:both; width:auto; display:block; margin:1em 0 1em 5%;}
#mc_embed_signup #num-subscribers {font-size:1.1em;}
#mc_embed_signup #num-subscribers span {padding:.5em; border:1px solid #ccc; margin-right:.5em; font-weight:bold;}

#mc_embed_signup #mc-embedded-subscribe-form div.mce_inline_error {display:inline-block; margin:2px 0 1em 0; padding:3px; background-color:rgba(255,255,255,0.85); -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; font-size:14px; font-weight:normal; z-index:1; color:#e85c41;}
#mc_embed_signup #mc-embedded-subscribe-form input.mce_inline_error {border:2px solid #e85c41;}
`;

    return (
        <div
            className="fadeIn relative border border-gray-300 mx-auto mt-20 mb-70 p-30 rounded-lg bg-gray-100 max-w-3xl">

            {/*Begin Mailchimp Signup Form*/}
            <style type="text/css"
                   dangerouslySetInnerHTML={{
                       __html: `
${mailchimpCss}

#mc_embed_signup{clear:left; font:14px Helvetica,Arial,sans-serif}
/* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
                        `,
                   }}
            />
            <div id="mc_embed_signup" className="w-full">
                <form
                    action="https://chongcurtis.us19.list-manage.com/subscribe/post?u=dcb9ac87ea46a1ce8616c58f5&amp;id=143adbb116&amp;f_id=008eb1e4f0"
                    method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate"
                    target="_blank" noValidate>
                    <div id="mc_embed_signup_scroll">
                        <div className="mc-field-group">
                            <input type="email" defaultValue="" name="EMAIL"
                                   className="bg-[#f0f0f0] border-b-[1px] border-b-gray-300 text-slate-800 focus:outline-none required email"
                                   id="mce-EMAIL"
                                   placeholder="john.doe@gmail.com" required />
                        </div>
                        <div id="mce-responses" className="clear foot">
                            <div className="response hidden" id="mce-error-response" />
                            <div className="response hidden" id="mce-success-response" />
                        </div>
                        {/*real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                        <div className="absolute -left-[6000px]" aria-hidden="true">
                            <input type="text"
                                   placeholder="small input placed super far away"
                                   name="b_dcb9ac87ea46a1ce8616c58f5_143adbb116"
                                   tabIndex={-1} defaultValue="" />
                        </div>
                        <div className="optionalParent">
                            <div className="clear foot">
                                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe"
                                       className="bg-gray-300 border border-gray-400 text-black ml-15 button" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/*<script type="text/javascript"*/}
            {/*        dangerouslySetInnerHTML={{*/}
            {/*            __html: mailchimpValidationScript,*/}
            {/*        }}*/}
            {/*/>*/}
            {/*<script type="text/javascript"*/}
            {/*        dangerouslySetInnerHTML={{*/}
            {/*            __html: `(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';}(jQuery));var $mcj = jQuery.noConflict(true);`,*/}
            {/*        }}*/}
            {/*/>*/}
            {/*End mc_embed_signup*/}

            {/*<div id="mc_embed_signup" className="background-color: #f0f0f0;">*/}
            {/*    <form className="background-color: #f0f0f0; validate"*/}
            {/*          action="https://chongcurtis.us19.list-manage.com/subscribe/post?u=dcb9ac87ea46a1ce8616c58f5&amp;id=143adbb116"*/}
            {/*          method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form"*/}
            {/*          target="_blank"*/}
            {/*          noValidate>*/}
            {/*        <div id="mc_embed_signup_scroll" className="background-color: #f0f0f0;">*/}
            {/*            <input type="email"*/}
            {/*                   className="bg-[#f0f0f0] border-0 border-b-1 border-b-gray-800 text-slate-800 email"*/}
            {/*                   name="EMAIL" id="mce-EMAIL" placeholder="john.doe@gmail.com" required />*/}
            {/*            /!*real people should not fill this in and expect good things - do not remove this or risk form bot signups*!/*/}
            {/*            <div className="position: absolute; left: -5000px; background-color: #f0f0f0"*/}
            {/*                 aria-hidden="true">*/}
            {/*                <input type="text" name="b_dcb9ac87ea46a1ce8616c58f5_143adbb116" tabIndex={-1}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className="clear background-color: #f0f0f0;">*/}
            {/*                /!**/}
            {/*                    style="background-color: #e3e3e3; border: 1px solid rgba(180, 180, 180); color: black; margin-left: 15px;"*/}
            {/*                    *!/*/}
            {/*                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe;"*/}
            {/*                       className="button submit" />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </form>*/}
            {/*</div>*/}
        </div>
    );
}