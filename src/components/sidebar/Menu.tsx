import React, { useEffect, useRef } from "react";
import classNames from "classnames";
import Link from "next/link";

export type NavLink = {
    label: string;
    href: string;
    icon?: React.ReactNode;
};

type Props = {
    open: boolean;
    setOpen(open: boolean): void;
    navLinks: NavLink[];
};

const Menu = ({ open, setOpen, navLinks }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div
            ref={ref}
            className={classNames({
                "flex flex-col justify-between": true, // sidebar
                "bg-red-50 md:bg-background-color": true,
                "fixed top-0 z-0 md:sticky md:top-16 md:z-0 md:w-full 2xl:pl-[50px]": true, // positioning
                // NOTE: to change the width, you need to modify tailwind.config.js
                "h-full w-[300px] md:h-[100vh] md:w-[350px]": true, // for height and width
                ".3s transition-transform ease-in-out 2xl:translate-x-0": true, //animations
                "-translate-x-full": !open, // hide sidebar to the left when closed
            })}
        >
            <nav className="top-0 md:sticky md:top-16">
                <Link
                    className="ml-4 text-2xl text-slate-800 decoration-sleepover-secondary underline-offset-2 hover:underline hover:decoration-wavy"
                    href="/"
                >
                    curtischong.me
                </Link>
                {/* nav items */}
                <ul className="flex flex-col gap-2 py-2">
                    <nav className="top-0 md:sticky md:top-16">
                        {/* nav items */}
                        <ul className="flex flex-col gap-2 py-2">
                            {navLinks.map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                    >
                                        <li
                                            className={classNames({
                                                "decoration-sleepover-secondary underline-offset-2 hover:underline hover:decoration-wavy":
                                                    true, // underline
                                                "flex items-center gap-4 ": true, //layout
                                                "transition-colors duration-300": true, //animation
                                                "mx-2 rounded-md p-2 text-slate-500": true, //self style
                                            })}
                                        >
                                            {item.icon} {item.label}
                                        </li>
                                    </Link>
                                );
                            })}
                        </ul>
                    </nav>
                </ul>
            </nav>
        </div>
    );
};
export default Menu;
