import React, {ComponentType} from "react";
import AtomScrollContainer from "./atom-scroll-container";

export enum BentoItemSize {
    Small = "col-span-1 row-span-1",
    Medium = "col-span-2 row-span-1",
    Large = "col-span-2 row-span-2",
}

const availableSizes = [BentoItemSize.Small, BentoItemSize.Medium, BentoItemSize.Large];
const randomSize = () => {
    return availableSizes[Math.floor(Math.random() * availableSizes.length)];
}

export interface BentoBoxItemProps {
    size: BentoItemSize;
    className?: string;
}

interface AtomBentoBoxProps<T extends BentoBoxItemProps> {
    items: T[];
    component: ComponentType<T>;
    className?: string;
}

const AtomBentoBox = React.memo((<T extends BentoBoxItemProps>({
                                                       items,
                                                       component: Component,
                                                       className,
                                                   }: AtomBentoBoxProps<T>) => {
    return (
        <AtomScrollContainer>
            <div
                className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 p-2 ${className}`}
                style={{gridAutoRows: "250px"}}
            >
                {items.map((item, index) => (
                    <Component key={index} {...item} className={item.size ? item.size : randomSize()}/>
                ))}
            </div>
        </AtomScrollContainer>
    );
}));

export default AtomBentoBox;
