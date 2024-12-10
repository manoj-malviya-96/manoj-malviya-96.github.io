import React from "react";
import {AtomCard, AtomCardProps} from "./atom-card";

export interface AtomCarouselProps {
    items: Array<AtomCardProps>; // List of button props
    useLargeCards?: boolean;
}

export const AtomCarousel: React.FC<AtomCarouselProps> = ({items, useLargeCards = false}) => {
    //! Reason I am using this is because the prime-react carousel is not scrollable.
    //  This uses daisyUI
    return (
        <div className='carousel w-full h-fit justify-center items-center'>
            {items.map((item, index) => {
                return (
                    <div key={index} className="carousel-item
                                                w-1/2 md:w-1/3 xl:w-1/4 rounded-box p-2">
                        <AtomCard
                            image={item.image}
                            title={item.title}
                            date={item.date}
                            description={item.description}
                            isNew={item.isNew}
                            hasBorder={item.hasBorder}
                            onClick={item.onClick}
                            isLarge={useLargeCards}
                        />
                    </div>
                );
            })}
        </div>
    );
};



