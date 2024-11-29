import React from "react";
import Card from "./card";
import {SizeOptions} from "../utils/enums";
import {validateStructTypeForList} from "../utils/types";

const BentoBox = ({items, onClick, squareTiles = false, itemHeight = 150}) => {
    validateStructTypeForList(items, 'BentoBoxItem');

    const widthClass = squareTiles ? "w-fit" : "w-fit";
    const aspectRatio = squareTiles ? "1 / 1" : "4 / 3";

    return (
        <div
            className={`grid gap-4 h-fit ${widthClass} mx-auto 
                        grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12`}
            style={{gridAutoRows: `${itemHeight}px`}} // Base row height
        >
            {items.map((card, index) => {
                // Dynamically adjust col-span based on available columns
                const colSpan =
                    card.size === SizeOptions.Large
                        ? "lg:col-span-6 md:col-span-3 sm:col-span-2 col-span-1"
                        : card.size === SizeOptions.Medium
                            ? "lg:col-span-3 md:col-span-2 sm:col-span-1 col-span-1" // 4X2
                            : "col-span-1"; // Small 1X1

                const rowSpan = card.size === SizeOptions.Small ? "row-span-1" : "row-span-2";
                return (
                    <div
                        key={index}
                        className={`${colSpan} ${rowSpan} bg-transparent`}
                        style={{
                            aspectRatio: aspectRatio
                        }}
                    >
                        <Card
                            image={card.cover}
                            title={card.title}
                            date={card.date}
                            description={card.size !== "small" ? card.description : null}
                            onClick={() => onClick(card.onClickArg)}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default BentoBox;



