import React from "react";


const HeroList = ({contentList, numbered = false, className=''}) => {
    return (
        <div className={`${className} flex flex-col m-auto align-center gap-4`}>
            {
                contentList.map((content, index) => {
                    return (
                        <div className="flex flex-row gap-8 rounded-lg justify-center p-8 w-full h-fit
                                        border-2 border-info border-opacity-50">
                            <span className="text-2xl font-bold m-auto">{numbered ? `${index + 1}` : ""}</span>
                            <span className="text-2xl font-bold">{content}</span>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default HeroList;