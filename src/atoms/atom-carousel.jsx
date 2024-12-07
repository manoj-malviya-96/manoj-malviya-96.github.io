import React from "react";
import AtomCard from "./atom-card";
import {makeStruct, validateStructTypeForList} from "../utils/types";
import {Carousel} from "primereact/carousel";
import {ScreenSizeBreakPointsPx} from "../utils/screen";


export function createCarouselItem({title, description, date, tags, logo, size, hasBorder, isNew, onClickArg}) {
    return makeStruct({title, description, date, tags, logo, size, hasBorder, isNew, onClickArg},
        'CarouselItem');
}

export const AtomCarousel = ({items, onClick}) => {
    validateStructTypeForList(items, 'CarouselItem');
    //! Reason I am using this is because the prime-react carousel is not scrollable. This uses daisyUI
    return (
        <div className='carousel w-full m-auto'>
            {items.map((item, index) => {
                return (
                    <div key={index} className="carousel-item w-1/2 md:w-1/3 xl:w-1/4 h-fit rounded-box p-2">
                        <AtomCard
                            image={item.logo}
                            title={item.title}
                            date={item.date}
                            description={item.description}
                            isNew={item.isNew}
                            hasBorder={item.hasBorder}
                            onClick={() => onClick(item.onClickArg)}
                        />
                    </div>);
            })}
        </div>
    );
};



