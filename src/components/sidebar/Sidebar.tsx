// components/sidebar/Layout.tsx
import React, { PropsWithChildren, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Menu from "@/components/sidebar/Menu";
import { NavLinks } from "@/components/sidebar/NavLinks";
import { useRouter } from "next/router";

// from https://reacthustle.com/blog/next-js-tailwind-responsive-sidebar-layout
const Sidebar = (props: PropsWithChildren) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const router = useRouter();
    const isOnMainPage = router.pathname === "/";

    return (
        <div>
            <div className="fixed z-10" hidden={isOnMainPage}>
                <div className="w-full">
                    <button
                        className="m-2 rounded-2xl bg-red-50 p-2 shadow-md 2xl:hidden"
                        onClick={() => setIsMenuVisible((prev) => !prev)}
                    >
                        <Bars3Icon className="h-10 w-10 text-slate-500" />
                    </button>
                </div>
                <div className="grid md:grid-cols-sidebar">
                    <Menu open={isMenuVisible} setOpen={setIsMenuVisible} navLinks={NavLinks} />
                </div>
            </div>
            <div className="z-1 shadow-sm">{props.children}</div>
        </div>
    );
};

export default Sidebar;
