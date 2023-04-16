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

    // check if the user is on the specific page
    console.log(router.pathname);
    const isOnMainPage = router.pathname === "/";

    return (
        <div>
            <div className="fixed" hidden={isOnMainPage}>
                <div className="z-10 shadow-sm">
                    <button
                        className="2xl:hidden"
                        onClick={() => setIsMenuVisible((prev) => !prev)}
                    >
                        <Bars3Icon className="h-6 w-6" />
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
