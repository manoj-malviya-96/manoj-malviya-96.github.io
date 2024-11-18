import React from "react";
import AtomCard from "./atom-card";
import {makeStruct, validateStructTypeForList} from "../utils/types";
import {Carousel} from "primereact/carousel";
import {ScreenSizeBreakPointsPx} from "../utils/screen";


export function createCarouselItem({title, description, date, tags, logo, size, hasBorder, isNew, onClickArg}) {
    return makeStruct({title, description, date, tags, logo, size, hasBorder, isNew, onClickArg},
        'CarouselItem');
}

export const AtomCarousel = ({items, onClick, autoPlay = false}) => {
    validateStructTypeForList(items, 'CarouselItem');

    const makeCard = (card) => {
        return <div className="mr-2 h-full w-full">
            <AtomCard
                image={card.logo}
                title={card.title}
                date={card.date}
                description={card.description}
                isNew={card.isNew}
                hasBorder={card.hasBorder}
                onClick={() => onClick(card.onClickArg)}
            />
        </div>
    };

    const responsiveOptions = [
        {
            breakpoint: ScreenSizeBreakPointsPx.ExtraLarge,
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: ScreenSizeBreakPointsPx.Large,
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: ScreenSizeBreakPointsPx.Medium,
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: ScreenSizeBreakPointsPx.Small,
            numVisible: 1,
            numScroll: 1
        }
    ];


    return (
        <div>
            <Carousel value={items} numScroll={1} numVisible={3} responsiveOptions={responsiveOptions}
                      autoplayInterval={autoPlay ? 3000 : 0} itemTemplate={makeCard}/>
        </div>
    );
};



