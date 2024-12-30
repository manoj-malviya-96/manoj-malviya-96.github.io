import React from "react";
import AtomBentoBox, {BentoBoxItemProps} from "./atom-bentobox";


export interface HeroListItemProps extends BentoBoxItemProps {
    summary: string;
    title?: string;
    icon?: string;
}

interface HeroListProps {
    contentList: Array<HeroListItemProps>;
    className?: string;
}

const AtomHeroListItem: React.FC<HeroListItemProps> = React.memo(({icon, title, summary}) => {
    const hasSub = title || icon;
    return (
        <div className="flex flex-col gap-8 rounded-lg justify-center p-8 w-full h-fit
                                        transition duration-300
                                        hover:bg-secondary hover:text-secondary-content
                                        cursor-auto border border-neutral border-opacity-50">
            {hasSub &&
                <div className={'flex flex-row gap-2 w-full'}>
                    {icon && <i className={`${icon} text-accent text-4xl`}/>}
                    {title && <span className={`text-5xl text-accent`}>{title}</span>}
                </div>
            }
            <span className={'text-lg w-full'}>{summary}</span>
        </div>
    );
});


const AtomHeroList: React.FC<HeroListProps> = React.memo(({
                                                              contentList,
                                                              className = ''
                                                          }) => {
    return (
        <AtomBentoBox
            className={`${className} w-full h-fit`}
            items={contentList}
            columns={2}
            component={AtomHeroListItem as unknown as React.ComponentType<BentoBoxItemProps>}
        />
    );
});

export default AtomHeroList;