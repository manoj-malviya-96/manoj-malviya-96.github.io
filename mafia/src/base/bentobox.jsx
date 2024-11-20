import React from "react";
import Card from "./card";

const generateGrid = (items, cols = 4) => {
    const grid = [];
    const positions = new Array(cols).fill(0); // Tracks the height of each column

    items.forEach((item) => {
        const size = item.size || "small";

        // Determine the card's dimensions
        let width = 1, height = 1;
        if (size === "medium") {
            width = 2;
            height = 1;
        } else if (size === "large") {
            width = 4;
            height = 2;
        }

        // Find the best position for the card
        let colStart = 0;
        let minHeight = Math.max(...positions);
        for (let i = 0; i <= cols - width; i++) {
            const colHeight = Math.max(...positions.slice(i, i + width));
            if (colHeight < minHeight) {
                colStart = i;
                minHeight = colHeight;
            }
        }

        // Update the grid layout
        for (let i = colStart; i < colStart + width; i++) {
            positions[i] = minHeight + height;
        }

        // Push card's final position
        grid.push({...item, colStart, rowStart: minHeight});
    });

    return grid;
};

const BentoBox = ({ items, itemHeight = 150 }) => {
    const grid = generateGrid(items, 8); // Assume 8 columns max

    return (
        <div
            className="grid gap-4 h-fit w-4/5 mx-auto grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
            style={{ gridAutoRows: `${itemHeight}px` }} // Base row height
        >
            {grid.map((card, index) => {
                const colSpan =
                    card.size === "large"
                        ? "col-span-4"
                        : card.size === "medium"
                            ? "col-span-2"
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
                            description={card.description}
                            onClick={card.onClick}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default BentoBox;


