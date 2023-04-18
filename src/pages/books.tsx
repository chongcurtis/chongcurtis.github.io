import Link from "next/link";

export default function Books() {
    return (
        // NOTE: <> must be used since styles are applied in a parent div
        <>
            <p>
                These are the books are the reason why I stopped attending class. They would occupy
                my thoughts for months and shape how I spent my evenings. So I wanted to make a
                series of interactive pages so hopefully more people will pick them up
            </p>
            <p>Here are my favourite books:</p>
            <div>
                <p>The Alchemy of Air</p>
                <p>How to Write Funny</p>
                <Link href="/books/the-dark-forest">The Dark Forest</Link>
                <p>Feeling Great</p>
                <div></div>
            </div>
        </>
    );
}
