import React from "react";
import Card from "./card";
import {SizeOptions} from "../utils/enums";
import {validateStructTypeForList} from "../utils/types";

const BentoBox = ({items, onClick, itemHeight = 150}) => {
    validateStructTypeForList(items, 'BentoBoxItem');
    return (
        <div
            className="grid gap-4 h-fit w-full mx-auto grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
            style={{gridAutoRows: `${itemHeight}px`}} // Base row height
        >
            {items.map((card, index) => {
                // Dynamically adjust col-span based on available columns
                const colSpan =
                    card.size === SizeOptions.Large
                        ? "lg:col-span-4 md:col-span-3 sm:col-span-2 col-span-1"
                        : card.size === SizeOptions.Medium
                            ? "lg:col-span-2 md:col-span-2 sm:col-span-2 col-span-1"
                            : "col-span-1";
                const rowSpan = card.size === SizeOptions.Large ? "row-span-2" : "row-span-1";

                return (
                    <div
                        key={index}
                        className={`${colSpan} ${rowSpan} bg-transparent`}
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



