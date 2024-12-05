import {BentoboxSizeOption} from "../../utils/enums";
import {createBentoBoxItem, createTabItem, createTimeLineItem, makeStruct, rangesTo} from "../../utils/types";
import {getScaleColor} from "../../utils/color";

export class BlogInfo {
    constructor({
                    id, title, description, summary, date, tags, cover, sections,
                    icon= '',
                    isNew=false,
                    card_size = BentoboxSizeOption.Regular
                }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.summary = summary
        this.date = date;
        this.tags = tags;
        this.cover = cover;
        this.icon = icon;
        this.card_size = card_size
        this.sections = sections
        this.isNew = isNew
        this.path = '/blogs/' + this.id;
    }

    bentobox() {
        return createBentoBoxItem(
            {
                title: this.title,
                description: this.description,
                date: this.date,
                tags: this.tags,
                logo: this.cover,
                size: this.card_size,
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


export const heatmapColorScale = getScaleColor("rgb(83,139,216)", "rgba(94,94,94,0.87)", 8);
