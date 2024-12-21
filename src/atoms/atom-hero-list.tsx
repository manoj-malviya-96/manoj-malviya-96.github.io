import React from "react";


interface HeroListProps {
    contentList: Array<string>;
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
                                        hover:border-opacity-100 transition duration-300 ease-in-out
                                        cursor-pointer border-2 border-primary border-opacity-50">
                            <span
                                className="text-xl m-auto">{numbered ? `${index + 1}` : ""}</span>
                            <span
                                className="text-xl">{content}</span>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default AtomHeroList;