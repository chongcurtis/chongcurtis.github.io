import Link from "next/link";

{
    /*
            sleepovers
            microbogs
            books
            where we met
            cool projects?
            */
}

export default function Home() {
    return (
        <main className="back flex min-h-screen flex-row items-center justify-center">
            <div className="w-1/2"></div>
            <div className="flex w-1/2 justify-end">
                <div className="place-items-center">
                    <p>
                        Hello I&apos;m Curtis! I grew up in the GTA and moved to Waterloo for
                        school. I&apos;m currently trying to build a zero-knowledge proofs company
                        with some friends. Anyhow, I made this site to document my yellow brick road
                        in progress. Wanna look around?
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href="/sleepovers"
                            className="underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                        >
                            My newsletter about project ideas
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
