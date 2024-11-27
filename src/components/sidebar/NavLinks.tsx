import { NavLink } from "@/components/sidebar/Menu";
import {
    BookOpenIcon,
    PencilIcon,
    MusicalNoteIcon,
    SparklesIcon,
    KeyIcon,
    GlobeEuropeAfricaIcon,
    BeakerIcon,
    CubeTransparentIcon,
} from "@heroicons/react/24/solid";

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
    {
        label: "Dreams",
        href: "/dreams",
        icon: <SparklesIcon className="h-4 w-4 text-slate-400" />,
    },
    {
        label: "Passion Projects",
        href: "/passion",
        icon: <BeakerIcon className="h-4 w-4 text-slate-400" />,
    },
    {
        label: "Materials",
        href: "/materials/polymers",
        icon: <CubeTransparentIcon className="h-4 w-4 text-slate-400" />,
        children: [
            {
                label: "Polymers",
                href: "/materials/polymers",
            },
            {
                label: "EGNN Checklist",
                href: "/materials/egnn_checklist",
            },
        ],
    },
    // {
    //     label: "Crypto Blog",
    //     href: "/crypto-blog/why-put-dark-forest-onchain",
    //     icon: <GlobeEuropeAfricaIcon className="h-5 w-5 text-slate-400" />,
    //     children: [
    //         {
    //             label: "Why Put Dark Forest Onchain?",
    //             href: "/crypto-blog/why-put-dark-forest-onchain",
    //         },
    //     ],
    // },
    // {
    //     label: "Songs",
    //     href: "/songs",
    //     icon: <MusicalNoteIcon className="h-4 w-4 text-slate-400" />,
    // },
];
