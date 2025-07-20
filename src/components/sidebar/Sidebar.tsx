// components/sidebar/Layout.tsx
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Menu from "@/components/sidebar/Menu";
import { NavLinks } from "@/components/sidebar/NavLinks";
import { useRouter } from "next/router";
import classNames from "classnames";

// from https://reacthustle.com/blog/next-js-tailwind-responsive-sidebar-layout
const Sidebar = (props: PropsWithChildren) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const router = useRouter();
    const isOnMainPage = router.pathname === "/";
    useEffect(() => {
        setIsMenuVisible(false);
    }, [router.pathname]);

    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function handleClickOutsideMenu(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuVisible(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutsideMenu);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        };
    }, []);

    return (
        <div>
            <div className="fixed z-10" hidden={isOnMainPage}>
                <div className="w-full" hidden={isMenuVisible}>
                    <button
                        className="m-2 rounded-xl bg-red-50 p-1 shadow-md xl:hidden"
                        onClick={() => setIsMenuVisible((prev) => !prev)}
                    >
                        <Bars3Icon className="h-8 w-8 text-slate-500" />
                    </button>
                </div>
                <div className={classNames("md:grid-cols-sidebar grid ")} ref={menuRef}>
                    <Menu navLinks={NavLinks} isOpen={isMenuVisible} />
                </div>
                <div className="md:grid-cols-sidebar grid ">
                    {/* <Menu open={isMenuVisible} setOpen={setIsMenuVisible} navLinks={NavLinks} /> */}
                </div>
            </div>
            <div>
                <div
                    className={classNames({
                        "align-center mx-auto flex max-w-3xl flex-col justify-center bg-background-color":
                            true,
                        // TODO: make the site unscrollable when the menu is open
                        // "overflow-auto": !isMenuVisible,
                        // "overflow-hidden": isMenuVisible,
                    })}
                >
                    {props.children}
                </div>

                {/* This element is an overlay element to dim the background when the sidebar is opened*/}
                {/* Only show this element if we are NOT on the main page AND they expand the sidebar */}
                <div
                    hidden={isOnMainPage || !isMenuVisible}
                    className={classNames({
                        "fixed left-0 top-0 h-full w-full bg-black": true,

                        "pointer-events-none opacity-30 transition-opacity duration-300 ease-in":
                            isMenuVisible,
                        "opacity-0 transition-opacity duration-300 ease-out": !isMenuVisible,
                    })}
                ></div>
            </div>
        </div>
    );
};

export default Sidebar;
