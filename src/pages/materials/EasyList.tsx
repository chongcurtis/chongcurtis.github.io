import React from "react";

interface ListItem {
    beforeContent?: string;
    content: string;
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
                const { beforeContent, content, children } = item;

                // Base class for all <li> elements
                let liClassName = "fade-in-on-scroll";
                let style: React.CSSProperties = {};

                if (level === 1) {
                    // Top-level <li> styling
                    liClassName += " mt-4";
                } else {
                    let marginLeft = level * 15;
                    if (level === 2) {
                        marginLeft += 0; // Add padding for better alignment
                    }
                    style = { marginLeft };
                    liClassName +=
                        " mt-2 list-disc marker:text-center marker:font-extrabold marker:text-slate-800";
                }

                // Use a wrapper div inside li for the grid layout
                const contentStyle: React.CSSProperties = {
                    display: "grid",
                    gridTemplateColumns: beforeContent ? "auto 1fr" : "1fr",
                    columnGap: "0.8rem",
                    alignItems: "start",
                };

                return (
                    <li key={index} className={liClassName} style={style}>
                        <div style={contentStyle}>
                            {beforeContent && (
                                <span
                                    style={{
                                        fontWeight: "bold",
                                        color: "#4d8eff",
                                    }}
                                >
                                    {beforeContent}
                                </span>
                            )}
                            <div>
                                {content}
                                {children && children.length > 0 && (
                                    <EasyList items={children} level={level + 1} />
                                )}
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
