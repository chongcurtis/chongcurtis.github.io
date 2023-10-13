import React, { useState, useEffect } from "react";
import ThinLine from "../ThinLine";
import VerticalThinLine from "../VerticalThinLine";

export type Dream = {
    description: string;
    imgUrls: string[];
};

type DreamsViewerProps = {
    dreams: Dream[];
};

export const DreamsViewer: React.FC<DreamsViewerProps> = ({ dreams }) => {
    const [selectedDream, setSelectedDream] = useState<Dream | null>(null);

    useEffect(() => {
        if (dreams.length > 0) {
            setSelectedDream(dreams[0]);
        }
    }, [dreams]);

    const selectDream = (dream: Dream) => {
        setSelectedDream(dream);
    };

    return (
        <div className="flex">
            <div className="w-64 flex-none overflow-auto">
                <ul className="divide-y divide-gray-200">
                    {dreams.map((dream, idx) => (
                        <li
                            key={idx}
                            className="cursor-pointer px-2 py-6"
                            onClick={() => selectDream(dream)}
                        >
                            {dream.description}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="align-center my-auto flex h-[200px]">
                <VerticalThinLine animateImmediately={true} />
            </div>
            <div className="flex-grow bg-gray-50 p-4">
                {selectedDream &&
                    selectedDream.imgUrls.map((imgUrl, idx) => (
                        <div key={idx}>
                            <img
                                src={imgUrl}
                                alt={selectedDream.description}
                                className="w-full object-contain"
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DreamsViewer;
