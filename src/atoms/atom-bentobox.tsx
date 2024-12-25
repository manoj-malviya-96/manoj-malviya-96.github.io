import React from "react";
import AtomScrollContainer from "./atom-scroll-container";

export enum BentoItemSize {
    Small = "col-span-1 row-span-1",
    Medium = "col-span-2 row-span-1",
    Large = "col-span-2 row-span-2",
}

interface AtomBentoItemProps {
    image: string;
    onClick?: () => void;
    title?: string;
    size?: BentoItemSize;
    description?: string;
    className?: string;
}

const _AtomBentoBoxItem: React.FC<AtomBentoItemProps> = ({
                                                             image,
                                                             onClick,
                                                             title,
                                                             size = BentoItemSize.Medium,
                                                             description,
                                                             className,
                                                         }) => {
    return (
        <div
            className={`relative rounded-none cursor-pointer transition overflow-hidden
                        ${size} ${className}`}
            onClick={onClick}
        >
            <img
                src={image}
                alt={title || "Bento Item"}
                loading={'lazy'}
                className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 p-2">
                <h3 className="text-lg uppercase text-white
                            font-bold text-center">{title}</h3>
            </span>
            {description && (
                <span
                    className="absolute inset-0 p-8 flex items-center justify-center bg-primary bg-opacity-50
                                opacity-0 hover:opacity-100 transition hover:backdrop-blur-sm">
                    {description}
                </span>
            )}
        </div>
    );
};
const AtomBentoBoxItem = React.memo(_AtomBentoBoxItem);

interface AtomBentoBoxProps {
    items: AtomBentoItemProps[];
    className?: string;
}

const _AtomBentoBox: React.FC<AtomBentoBoxProps> = ({
                                                        items,
                                                        className,
                                                    }) => {
    
    items.sort((a, b) => {
        return a.size === b.size ? 0 : a.size === BentoItemSize.Large ? -1 : 1;
    });
    
    return (
        <AtomScrollContainer>
            <div
                className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 p-2 ${className}`}
                style={{gridAutoRows: "250px"}}
            >
                {items.map((item, index) => (
                    <AtomBentoBoxItem key={index} {...item}/>
                ))}
            </div>
        </AtomScrollContainer>
    );
};

const AtomBentoBox = React.memo(_AtomBentoBox);
export default AtomBentoBox;
