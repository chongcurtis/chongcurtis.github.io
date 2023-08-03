import { NavLink } from "@/components/sidebar/Menu";
import { BookOpenIcon, PencilIcon, BeakerIcon, MusicalNoteIcon } from "@heroicons/react/24/solid";

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
                label: "Coming Soon",
                href: "/books-coming-soon",
            },
        ],
    },
    // {
    //     label: "Dreams",
    //     href: "/dreams",
    //     icon: <BeakerIcon className="h-4 w-4 text-slate-400" />,
    // },
    // {
    //     label: "Songs",
    //     href: "/songs",
    //     icon: <MusicalNoteIcon className="h-4 w-4 text-slate-400" />,
    // },
];
