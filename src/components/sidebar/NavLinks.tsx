import { NavLink } from "@/components/sidebar/Menu";
import { BookOpenIcon, PencilIcon } from "@heroicons/react/24/solid";

export const NavLinks: NavLink[] = [
    {
        label: "Sleepovers at the Office",
        href: "/sleepovers",
        icon: <PencilIcon className="h-4 w-4 text-slate-400" />,
    },
    {
        label: "Books That Stole My Heart",
        href: "/books/the-alchemy-of-air",
        icon: <BookOpenIcon className="h-4 w-4 text-slate-400" />,
        children: [
            {
                label: "The Alchemy of Air",
                href: "/books/the-alchemy-of-air",
            },
            {
                label: "The Dark Forest",
                href: "/books/the-dark-forest",
            },
        ],
    },
];
