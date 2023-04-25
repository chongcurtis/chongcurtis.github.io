import Link from "next/link";

export default function Books() {
    return (
        // NOTE: <> must be used since styles are applied in a parent div
        <>
            <p>
                These books curtsied their way into my thoughts for months on end. I loved them so
                much I made a series of "trailers"/analysis of my favourite moments. These pages are
                interactive, so I hope you enjoy them!
            </p>
            <p>Here are my favourite books:</p>
            <div>
                <Link href="/books/the-alchemy-of-air">The Alchemy of Air</Link>
                <p>Coming soon: How to Write Funny</p>
                <Link href="/books/the-dark-forest">The Dark Forest</Link>
                <p>Common soon: Feeling Great</p>
                <div></div>
            </div>
        </>
    );
}
