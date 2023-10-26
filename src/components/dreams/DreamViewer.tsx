import React, { useState, useEffect } from "react";
import VerticalThinLine from "../VerticalThinLine";
import Image from "next/image";

interface ImgUrl {
    url: string;
    alt: string;
}

export type Dream = {
    description: JSX.Element;
    imgUrls: ImgUrl[];
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
        <div className="flex flex-col md:flex-row">
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
            <div className="align-center my-auto flex hidden h-[200px] md:block">
                <VerticalThinLine animateImmediately={true} />
            </div>
            <div className="h-[500px] p-4">
                {" "}
                {selectedDream &&
                    selectedDream.imgUrls.map((imgUrl, idx) => (
                        <div key={idx} className="h-[500px] w-[500px]">
                            <Image
                                width={500}
                                height={500}
                                src={imgUrl.url}
                                alt={imgUrl.alt}
                                className="w-full object-contain"
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DreamsViewer;
