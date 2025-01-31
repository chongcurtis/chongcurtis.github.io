import Link from "next/link";
import { NavLinks } from "@/components/sidebar/NavLinks";
import headshot from "public/curtis-chong-headshot-small.png";
import { SocialLinks } from "@/components/sidebar/SocialLinks";
import ThinLine from "@/components/ui/ThinLine";

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
            {/*This was made using https://www.remove.bg It's really nice since you can "restore" parts that were removelee*/}
            <div className="w-full p-3 md:p-0">
                <img src={headshot.src} alt="Me!" className="object-left" />
            </div>
            <div className="mt-10 flex justify-end md:m-5">
                <div className="place-items-center px-5">
                    <p>
                        Hello I&apos;m Curtis! I grew up in the GTA and moved to Waterloo for
                        school.
                    </p>
                    <p className="mb-5 mt-5">
                        Anyhow, I made this site to document my yellow brick road in progress. Wanna
                        look around?
                    </p>
                    <div className="flex flex-col space-y-3">
                        {NavLinks.map((navLink, idx) => {
                            return (
                                <div key={`home-navlink-${idx}`} className="flex flex-row">
                                    {navLink.icon}
                                    <Link
                                        href={navLink.href}
                                        className="-mt-[6px] ml-3 text-left underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
                                    >
                                        {navLink.label}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <div className="h-3"></div>
                    <ThinLine animateImmediately={true} />
                    <SocialLinks />
                </div>
            </div>
            <div className="h-32" />
        </main>
    );
}
