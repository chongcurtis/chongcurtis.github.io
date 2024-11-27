import React from "react";

interface ListItem {
    content: string;
    beforeContent?: string;
    children?: ListItem[];
}

interface ListProps {
    items: ListItem[];
    level?: number;
}

export const EasyList: React.FC<ListProps> = ({ items, level = 1 }) => {
    // Apply class names to the top-level <ul>
    const ulClassName = level === 1 ? "mt-2 list-none" : "";
    // ulClassName += " leading-loose";

    return (
        <ul className={ulClassName}>
            {items.map((item, index) => {
                const { content, beforeContent, children } = item;

                // Base class for all <li> elements
                let liClassName = "fade-in-on-scroll";
                let style = {};

                if (level === 1) {
                    // Top-level <li> styling
                    liClassName += " mt-4";
                    if (beforeContent) {
                        const escapedContent = beforeContent.replace(/'/g, "\\'");
                        console.log(escapedContent);
                        liClassName += ` before:mr-2 before:font-bold before:text-red-400 [before:content-['${escapedContent}']]`;
                    }
                } else {
                    let marginLeft = level * 15;
                    if (level === 2) {
                        marginLeft += 30; //add padding since the li at level1 is pushed to the right a bit (cuase of hte marker) so adding more padding looks better
                    }
                    style = { marginLeft };
                    liClassName += ` mt-2 list-disc marker:text-center marker:font-extrabold marker:text-slate-800`;
                }

                return (
                    <li key={index} className={liClassName} style={style}>
                        {content}
                        {children && children.length > 0 && (
                            <EasyList items={children} level={level + 1} />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
