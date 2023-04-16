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
                "bg-indigo-700 text-zinc-50": true, // colors
                "fixed top-0 z-20 md:sticky md:top-16 md:z-0 md:w-full md:pl-[150px]": true, // positioning
                // NOTE: to change the width, you need to modify tailwind.config.js
                "h-full w-[300px] md:h-[calc(100vh_-_64px)] md:w-[450px]": true, // for height and width
                ".3s transition-transform ease-in-out md:translate-x-0": true, //animations
                "-translate-x-full": !open, //hide sidebar to the left when closed
            })}
        >
            <nav className="top-0 md:sticky md:top-16">
                {/* nav items */}
                <ul className="flex flex-col gap-2 py-2">
                    <nav className="top-0 md:sticky md:top-16">
                        {/* nav items */}
                        <ul className="flex flex-col gap-2 py-2">
                            {navLinks.map((item, index) => {
                                return (
                                    <Link key={index} href={item.href}>
                                        <li
                                            className={classNames({
                                                "text-indigo-100 hover:bg-indigo-900": true, //colors
                                                "flex items-center gap-4 ": true, //layout
                                                "transition-colors duration-300": true, //animation
                                                "mx-2 rounded-md p-2": true, //self style
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
