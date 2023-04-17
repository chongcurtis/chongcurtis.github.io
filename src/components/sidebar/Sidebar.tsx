// components/sidebar/Layout.tsx
import React, { PropsWithChildren, useState } from "react";
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

    return (
        <div>
            <div className="fixed z-10" hidden={isOnMainPage}>
                <div className="w-full" hidden={isMenuVisible}>
                    <button
                        className="m-2 rounded-2xl bg-red-50 p-2 shadow-md xl:hidden"
                        onClick={() => setIsMenuVisible((prev) => !prev)}
                    >
                        <Bars3Icon className="h-10 w-10 text-slate-500" />
                    </button>
                </div>
                <div className="md:grid-cols-sidebar grid ">
                    <Menu open={isMenuVisible} setOpen={setIsMenuVisible} navLinks={NavLinks} />
                </div>
            </div>
            <div>
                <div
                    className={classNames({
                        "align-center mx-auto flex max-w-3xl flex-col place-items-center justify-center bg-background-color":
                            true,
                        // TODO: make the site unscrollable when the menu is open
                        // "overflow-auto": !isMenuVisible,
                        // "overflow-hidden": isMenuVisible,
                    })}
                >
                    {props.children}
                </div>
                <div
                    hidden={isOnMainPage}
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
