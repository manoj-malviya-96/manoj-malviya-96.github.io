import React from "react";
import Card from "./card";
import {BentoboxSizeOption} from "../utils/enums";
import {validateStructTypeForList} from "../utils/types";

function getColumnSpan(sizeOption) {
    switch (sizeOption) {
        case BentoboxSizeOption.Large:
        case BentoboxSizeOption.Wide:
            return "lg:col-span-2 md:col-span-1 col-span-1";
        case BentoboxSizeOption.Tall:
        case BentoboxSizeOption.Regular:
        default:
            return "lg:col-span-1 md:col-span-1 col-span-1";
    }
}

function getRowSpan(sizeOption) {
    switch (sizeOption) {
        case BentoboxSizeOption.Large:
        case BentoboxSizeOption.Tall:
            return "row-span-2";
        case BentoboxSizeOption.Regular:
        default:
            return "row-span-1";
    }
}

const BentoBox = ({items, onClick, squareTiles = false, itemHeight = 150}) => {
    validateStructTypeForList(items, 'BentoBoxItem');

    const widthClass = squareTiles ? "w-fit" : "w-fit";

    return (
        <div
            className={`grid h-fit ${widthClass} gap-4 mx-auto 
                        grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}
            style={{gridAutoRows: `${itemHeight}px`}} // Base row height
        >
            {items.map((card, index) => {
                // Dynamically adjust col-span based on available columns
                const colSpan = getColumnSpan(card.size);
                const rowSpan = getRowSpan(card.size);
                return (
                    <div
                        key={index}
                        className={`${colSpan} ${rowSpan} bg-transparent`}
                    >
                        <Card
                            image={card.logo}
                            title={card.title}
                            date={card.date}
                            description={card.description}
                            isNew={card.isNew}
                            hasBorder={card.hasBorder}
                            onClick={() => onClick(card.onClickArg)}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default BentoBox;



