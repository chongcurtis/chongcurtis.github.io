import Link from "next/link";
import { NavLinks } from "@/components/sidebar/NavLinks";
import headshot from "public/curtis-chong-headshot.png";

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
        <main className="flex min-h-screen flex-row flex-wrap items-center justify-center md:flex-nowrap">
            <div className="w-full ">
                <img src={headshot.src} alt="Me!" className="object-left" />
            </div>
            <div className="flex justify-end md:m-5">
                <div className="place-items-center px-5">
                    <p>
                        Hello I&apos;m Curtis! I grew up in the GTA and moved to Waterloo for
                        school. I&apos;m currently researching verifiable computation with some
                        friends.
                    </p>
                    <p className="mb-5 mt-5">
                        Anyhow, I made this site to document my yellow brick road in progress. Wanna
                        look around?
                    </p>
                    <div className="flex flex-col space-y-2">
                        {NavLinks.map((navLink, idx) => {
                            return (
                                <Link
                                    key={`home-navlink-${idx}`}
                                    href={navLink.href}
                                    className="text-left underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                                >
                                    {navLink.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="h-32" />
        </main>
    );
}
