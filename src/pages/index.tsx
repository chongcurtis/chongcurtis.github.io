import Link from "next/link";
import { NavLinks } from "@/components/sidebar/NavLinks";

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
                        school. I&apos;m currently trying to build a verifiable computation startup
                        with some friends.
                    </p>
                    <p className="mb-5 mt-5">
                        Anyhow, I made this site to document my yellow brick road in progress.
                    </p>
                    <p className="mb-5 mt-5">Wanna look around?</p>
                    <div className="flex justify-center">
                        {NavLinks.map((navLink, idx) => {
                            return (
                                <Link
                                    key={`home-navlink-${idx}`}
                                    href={navLink.href}
                                    className="underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                                >
                                    {navLink.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}
