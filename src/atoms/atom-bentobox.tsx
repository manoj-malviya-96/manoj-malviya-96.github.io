import React, {ComponentType} from "react";
import AtomScrollContainer from "./atom-scroll-container";

export enum BentoItemSize {
    Small = 1,
    Medium = 2,
    Large = 3,
}

export interface BentoBoxItemProps {
    size: BentoItemSize;
}

interface AtomBentoBoxProps<T extends BentoBoxItemProps> {
    items: T[];
    component: ComponentType<T>;
    autoRowsSize?: number;
    columns?: number;
    className?: string;
}

function toSpan(size: BentoItemSize, maxColumns = 4) {
    switch (size) {
        case BentoItemSize.Small:
            return `col-span-1 row-span-1`;
        case BentoItemSize.Medium:
            if (maxColumns < 3) {
                return `col-span-1 row-span-1`;
            }
            return `col-span-2 row-span-1`;
        case BentoItemSize.Large:
            if (maxColumns < 3) {
                return `col-span-2 row-span-1`;
            }
            return `col-span-2 row-span-2`;
    }
}


const AtomBentoBox = React.memo((
    <T extends BentoBoxItemProps>({
                                      items,
                                      component: Component,
                                      className,
                                      autoRowsSize = 0,
                                      columns = 4,
                                  }: AtomBentoBoxProps<T>) => {
        return (
            <AtomScrollContainer>
                <div
                    className={`grid gap-4 p-2 ${className} items-start`}
                    style={{
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gridAutoRows: `minmax(${autoRowsSize}px, min-content)`,
                        gridAutoFlow: 'dense',
                    }}
                >
                    {items.map((item, index) => (
                        <Component key={index} {...item} className={toSpan(item.size, columns)}/>
                    ))}
                </div>
            </AtomScrollContainer>
        );
    }
));

export default AtomBentoBox;
