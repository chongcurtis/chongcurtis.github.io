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

    return (
        <ul className={ulClassName}>
            {items.map((item, index) => {
                const { content, beforeContent, children } = item;

                // Base class for all <li> elements
                let liClassName = "fade-in-on-scroll";
                let style: React.CSSProperties = {};

                if (level === 1) {
                    // Top-level <li> styling
                    liClassName += " mt-4";
                } else {
                    let marginLeft = level * 15;
                    if (level === 2) {
                        marginLeft += 30; // Add padding for better alignment
                    }
                    style = { marginLeft };
                    liClassName +=
                        " mt-2 list-disc marker:text-center marker:font-extrabold marker:text-slate-800";
                }

                return (
                    <li key={index} className={liClassName} style={style}>
                        {beforeContent && (
                            <span
                                style={{
                                    marginRight: "0.8rem",
                                    fontWeight: "bold",
                                    color: "#4d8eff",
                                }}
                            >
                                {beforeContent}
                            </span>
                        )}
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
