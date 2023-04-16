import Link from "next/link";

export default function Home() {
    return (
        <main className="back flex min-h-screen flex-col items-center justify-between bg-background-color p-24">
            {/*
            sleepovers
            microbogs
            books
            where we met
            cool projects?
            */}
            <div className="place-items-center ">
                <p>
                    Hello I&apos;m Curtis! I grew up in the GTA and moved to Waterloo for school.
                    I&apos;m currently trying to build a zero-knowledge proofs company with some
                    friends. Anyhow, I made this site to document my yellow brick road in progress.
                    Wanna look around?
                </p>
            </div>
            <div>
                {/*<Link href="/sleepovers" className="border-b-sleepover-secondary border-b-2">*/}
                <Link
                    href="/sleepovers"
                    className="underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                >
                    My newsletter about project ideas
                </Link>
                <p>Projects I'm proud of</p>
            </div>
        </main>
    );
}
