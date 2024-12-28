import React from "react";


interface HeroListItemProps {
    summary: string;
    title?: string;
    icon?: string;
}
export type HeroListContent = string | HeroListItemProps;

interface HeroListProps {
    contentList: Array<HeroListContent>;
    numbered?: boolean;
    className?: string;
}


const AtomHeroList: React.FC<HeroListProps> = ({
                                                   contentList,
                                                   numbered = false,
                                                   className = ''
                                               }) => {
    return (
        <div
            className={`${className} flex flex-col m-auto align-center gap-4`}>
            {
                contentList.map((content, index) => {
                    return (
                        <div className="flex flex-row gap-8 rounded-lg justify-center p-8 w-full h-fit
                                        transition duration-300 ease-in-out hover:bg-secondary hover:text-secondary-content
                                        cursor-auto border border-neutral border-opacity-50">
                            <span
                                className="text-xl m-auto">{numbered ? `${index + 1}` : ""}</span>
                            {typeof content === 'string' && <span
                                className="text-xl">{content}</span>}
                            {typeof content === 'object' &&
                                <div className={'flex flex-row gap-4 items-center justify-around'}>
                                    <div className={'flex flex-row gap-2 w-full'}>
                                        <i className={`${content.icon} text-accent text-4xl`}/>
                                        <span className={`text-5xl text-accent`}>{content.title}</span>
                                    </div>
                                    <span className={'text-lg w-full'}>{content.summary}</span>
                                </div>
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}

export default AtomHeroList;