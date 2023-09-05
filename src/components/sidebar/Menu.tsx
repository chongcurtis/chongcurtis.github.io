import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { SocialLinks } from "./SocialLinks";

export type NavLink = {
    label: string;
    href: string;
    icon?: React.ReactNode;
    children?: NavLink[];
};

type Props = {
    isOpen: boolean;
    navLinks: NavLink[];
};

const Menu = ({ navLinks, isOpen }: Props) => {
    return (
        <div
            className={classNames({
                "flex flex-col justify-between": true, // sidebar
                "bg-background-color": true,
                "fixed top-0 z-0 pl-[1.6rem] md:sticky md:z-0 md:w-full 2xl:pl-[10vh]": true, // positioning
                // NOTE: to change the width, you need to modify tailwind.config.js
                "h-full w-3/4 md:h-[100vh] 2xl:w-[25rem]": true, // for height and width
                ".3s transition-transform ease-in-out xl:translate-x-0": true, //animations
                "-translate-x-full": !isOpen, // hide sidebar to the left when closed
            })}
        >
            <nav className="pt-[8rem] md:sticky">
                <Link
                    className="ml-4 text-xl text-slate-800 decoration-sleepover-secondary underline-offset-2 hover:underline hover:decoration-wavy"
                    href="/"
                >
                    curtischong.me
                </Link>
                <PageLinks navLinks={navLinks} />
                <SocialLinks />
            </nav>
        </div>
    );
};

interface PageLinksProps {
    navLinks: NavLink[];
}

const PageLinks = ({ navLinks }: PageLinksProps) => {
    const router = useRouter();
    const currentPage = router.asPath;
    return (
        <ul className="flex flex-col gap-2 py-2">
            {navLinks.map((navLink, index) => {
                return (
                    <div key={`navlink-${index}`}>
                        <Link href={navLink.href}>
                            <li
                                className={classNames({
                                    "decoration-sleepover-secondary underline-offset-2 hover:underline hover:decoration-wavy":
                                        true, // underline
                                    "flex items-center gap-4 ": true, //layout
                                    "transition-colors duration-300": true, //animation
                                    "mx-2 rounded-md p-2 text-slate-500": true, //self style
                                    "font-bold": currentPage === navLink.href && !navLink.children, // don't bold if we have children cause the child page would be bold
                                })}
                            >
                                {navLink.icon} {navLink.label}
                            </li>
                        </Link>
                        {/* display child links */}
                        {navLink.children && (
                            <div className="ml-8">
                                {navLink.children.map((childLink, childIdx) => {
                                    return (
                                        <Link
                                            href={childLink.href}
                                            key={`navlink-${index}-${childIdx}`}
                                            className={classNames({
                                                "decoration-sleepover-secondary underline-offset-2 hover:underline hover:decoration-wavy":
                                                    true, // underline
                                                "flex items-center gap-4 ": true, //layout
                                                "transition-colors duration-300": true, //animation
                                                "mx-2 rounded-md p-2 text-slate-500": true, //self style
                                                "font-bold": currentPage === childLink.href,
                                            })}
                                        >
                                            {childLink.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </ul>
    );
};

export default Menu;
