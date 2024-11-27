import { ReactNode } from "react";
import Link from "next/link";

interface Props {
    href: string;
    children: ReactNode;
}

export const DecoratedLink = ({ href, children }: Props) => {
    return (
        <Link
            href={href}
            className="underline decoration-sleepover-secondary underline-offset-2 hover:decoration-wavy"
            target="_blank"
        >
            {children}
        </Link>
    );
};
