import React from "react";
import Card from "./card";

const BentoBox = ({ items, itemHeight = 150 }) => {

    return (
        <div
            className="grid gap-4 h-fit mx-auto grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
            style={{ gridAutoRows: `${itemHeight}px` }} // Base row height
        >
            {items.map((card, index) => {
                // Dynamically adjust col-span based on available columns
                const colSpan =
                    card.size === "large"
                        ? "lg:col-span-4 md:col-span-3 sm:col-span-2 col-span-1"
                        : card.size === "medium"
                            ? "lg:col-span-2 md:col-span-2 sm:col-span-2 col-span-1"
                            : "col-span-1";
                const rowSpan = card.size === "large" ? "row-span-2" : "row-span-1";

                return (
                    <div
                        key={index}
                        className={`${colSpan} ${rowSpan} rounded-lg shadow-sm`}
                    >
                        <Card
                            image={card.image}
                            title={card.title}
                            date={card.date}
                            description={card.size !== "small" ? card.description : null}
                            onClick={card.onClick}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default BentoBox;



