import {createTabItem, createTimeLineItem, makeStruct, rangesTo} from "../../utils/types";
import {getScaleColor} from "../../utils/color";
import {createCarouselItem} from "../../atoms/atom-carousel";

export class BlogInfo {
    constructor({
                    id, title, description, summary, date, tags, cover, sections,
                    icon= '',
                    isNew=false,
                }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.summary = summary
        this.date = date;
        this.tags = tags;
        this.cover = cover;
        this.icon = icon;
        this.sections = sections
        this.isNew = isNew
        this.path = '/blogs/' + this.id;
    }

    toCarouselItem() {
        return createCarouselItem(
            {
                title: this.title,
                description: this.description,
                date: this.date,
                tags: this.tags,
                logo: this.cover,
                isNew: this.isNew,
                onClickArg: this.path
            }
        )
    }

    tabs() {
        return rangesTo(this.sections, (section) => createTabItem({
            name: section.name, label: section.title, icon: section.icon
        }));
    }

    timelineItem() {
        return createTimeLineItem({
            id: this.id,
            title: this.title,
            date: this.date,
            icon: this.icon,
            image: this.cover,
            link: this.path
        })
    }

}

export function makeBlogImage({source, label}) {
    return makeStruct({source, label}, 'BlogImage');
}

export function makeBlogCode({language, code}) {
    return makeStruct({language, code}, 'BlogCode');
}

export function makeBlogPlot({dataTrace, title, xTitle, yTitle, textColor}) {
    return makeStruct({dataTrace, title, xTitle, yTitle, textColor}, 'BlogPlot');
}

export function makeBlogHeroText({text}){
    return makeStruct({text}, 'BlogHeroText');
}

export function makeBlogSectionContent({name, icon, title, paragraph, media}) {
    return makeStruct({name, icon, title, paragraph, media}, 'BlogSectionContent');
}


export function makeBlogHeroList({contentList, numbered = false}) {
    return makeStruct({contentList, numbered}, 'BlogHeroList');
}

export const heatmapColorScale = getScaleColor("rgb(83,139,216)", "rgba(94,94,94,0.87)", 8);
