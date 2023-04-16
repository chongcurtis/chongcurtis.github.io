// components/sidebar/Layout.tsx
import React, { PropsWithChildren, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Menu from "@/components/sidebar/Menu";
import { NavLinks } from "@/components/sidebar/NavLinks";

// from https://reacthustle.com/blog/next-js-tailwind-responsive-sidebar-layout
const Sidebar = (props: PropsWithChildren) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    return (
        <div>
            <div className="z-10 shadow-sm">
                <button className="md:hidden" onClick={() => setIsMenuVisible((prev) => !prev)}>
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>
            <div className="grid md:grid-cols-sidebar">
                <Menu open={isMenuVisible} setOpen={setIsMenuVisible} navLinks={NavLinks} />
                {props.children}
            </div>
        </div>
    );
};

export default Sidebar;
