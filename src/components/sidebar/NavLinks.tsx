import { NavLink } from "@/components/sidebar/Menu";
import { HomeIcon, NewspaperIcon } from "@heroicons/react/24/solid";

export const NavLinks: NavLink[] = [
    {
        label: "Curtis",
        href: "/",
        icon: <HomeIcon className="h-6 w-6" />,
    },
    {
        label: "Sleepovers at the Office",
        href: "/sleepovers",
        icon: <NewspaperIcon className="h-6 w-6" />,
    },
];
