export default function ResumeTips() {
    const tips = [
        'Try to phrase sentences in this format: (what you did, what impact it had).',
        'If you see weak action verbs (like "used", or "worked"), suggest alternatives. Explain why your new verb is stronger (is it more precise/sophisticated?).',
        "Identify metrics that sound fake (e.g. if someone says they improved something 1000000x, that seems suspicious).",
        "Use contractions since that leads to more white space.",
        "Don't list too many skills (only 6-8), since it signals to ppl that you're good at those skills, and not just spamming them.",
        "If your sentence starts with two verbs, combine them into one stronger verb (e.g. Designed and implemented, Led and organized, Designed and worked).",
        "Order the languages/tools/technologies based on its impressiveness. e.g. everyone knows HTML, so don't put it as the first language. Seeing C++ at the start makes you seem more technical.",
        "The first word of a bullet point should be a past tense action verb. Suggest one if it doesn't start with it (e.g. add one here: Storage engine built for the team).",
        'Try to make these sentences sound punchy. The verbs should be concise and sharp. Sentences should be as brief as possible. e.g. "worked on a distributed system that is scalable" \u2192 "Worked on a scalable distributed system".',
        "Try to sprinkle impact numbers or percentages in your resume. Not every bullet needs it, but it makes your resume stronger since it's a concrete metric you improved.",
        "Avoid the repetition of words in bullet points.",
        'Change "many" to specific quantities.',
        "Obscure acronyms are bad, reviewers may not understand them.",
        "Split long sentences into multiple sentences.",
        'Remove contrived noun phrases (e.g. "Optimized user creation generation using ASP.Net and React" \u2014 normal people won\'t understand what user creation generation is).',
        "Shorten months to their 3-letter abbreviation (to create more whitespace). If there is no month and only a year, do not add one.",
        "Remove honourifics (e.g. Honours Bachelor of Software Engineering). Everyone's degree starts with Honours. Removing it adds more whitespace.",
        'Convert "the" to "our" (e.g. "Sped up the trading engine 50%" \u2192 "Sped up our trading engine 50%"). This is because it\'s more informal and friendly.',
        'Don\'t restate your position in your bullet point. You\'ve already mentioned your position in the title! (e.g. "Working as a software engineering co-op").',
        "Remove unimpressive impact numbers. You can tell if a number is small based on the typical data point in the context. For example, if you migrated 1000 rows in a DB, this is small and not that impressive.",
        'Remove adjectives that don\'t add much (e.g. "worked on a blue distributed system").',
        "Don't have confusing jargon.",
        "Don't use numbers that don't make sense. e.g. in a ML resume, you might add numbers about the model's F1 score. But ppl don't know if that number's good if they don't have context.",
        'If a link starts with "https://" or "http://", remove the prefix. People know it\'s a link and it adds whitespace!',
        "Make sure the links are not malformed.",
        "Simplify section headers. Work Experience \u2192 Experience (whitespace).",
        "If your resume has a newline with only one or two words on that line, it looks bad because you're wasting so much space on that empty line. Try to shorten the sentence so it doesn't dangle over.",
        "Try to stick with past tense (even if you're currently working at the job), since it's easier for humans to read.",
        "Try to keep it to one page. You want to be concise and only put the most impressive points down. There's always stuff to prune.",
        "When editing, do not make random numbers up.",
    ];

    return (
        <>
            <h1 className="mt-32 text-3xl font-bold text-slate-700">Resume Tips</h1>
            <p className="mt-4 text-slate-600">
                Turns out Instagram has a message limit so here's the list — just
                paste it into ChatGPT with your resume!
            </p>
            <ol className="mt-6 list-decimal space-y-3 pl-6 text-slate-700">
                {tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                ))}
            </ol>
            <h2 className="mt-10 text-2xl font-bold text-slate-700">
                Extra Tips
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-6 text-slate-700">
                <li>
                    For each point, think carefully and if it decreases the average
                    quality of your resume, remove/improve it. (This is from the book Thinking Fast and Slow - bc when people judge the quality of something (art/a resume), they judge it by its average quality - not the quantity of work or its best part)
                </li>
                <li>
                    Use Bitly links instead of raw URLs. This lets you know which
                    links people care about and which to remove.
                </li>
            </ul>
            <div className="h-40" />
        </>
    );
}
