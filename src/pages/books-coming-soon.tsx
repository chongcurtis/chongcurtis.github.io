import Link from "next/link";

export default function BooksComingSoon() {
    return (
        // NOTE: <> must be used since styles are applied in a parent div
        <>
            <p className="mt-10">
                These books curtsied their way into my thoughts for months on end. I loved them so
                much I made a series of "trailers"/analysis of my favourite moments. These pages are
                interactive, so I hope you enjoy them!
            </p>
            {/*<p>Here are my favourite books:</p>*/}
            <div className="mt-10 flex flex-col space-y-5">
                <Link href="/books/the-alchemy-of-air" className="text-sleepover-secondary">
                    The Alchemy of Air
                </Link>
                <p>Coming soon: How to Write Funny</p>
                {/*<Link href="/books/the-dark-forest">The Dark Forest</Link>*/}
                <p>Common soon: Feeling Great</p>
                <p>Coming soon: The Dark Forest</p>
                <div></div>
            </div>
        </>
    );
}
