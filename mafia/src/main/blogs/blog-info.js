import {SizeOptions} from "../../utils/enums";
import {createBentoBoxItem, createTabItem, makeStruct, rangesTo} from "../../utils/types";

export class BlogInfo {
    constructor({
                    id, title, description, summary, date, tags, cover, sections,
                    card_size = SizeOptions.Medium
                }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.summary = summary
        this.date = date;
        this.tags = tags;
        this.cover = cover;
        this.card_size = card_size
        this.sections = sections
        this.path = '/blogs/' + this.id;
    }

    bentobox() {
        return createBentoBoxItem(
            {
                title: this.title,
                description: this.description,
                date: this.date,
                tags: this.tags,
                cover: this.cover,
                size: this.card_size,
                onClickArg: this.path
            }
        )
    }

    tabs() {
        const result = [createTabItem({name: 'header', label: 'Intro', icon: 'fas fa-heading'})];
        result.push(...rangesTo(this.sections, (section) => createTabItem({
            name: section.name, label: section.title, icon: section.icon
        })));
        return result;
    }


}

export function makeBlogImage({source, label}) {
    return makeStruct({source, label}, 'BlogImage');
}

export function makeBlogCode({language, code}) {
    return makeStruct({language, code}, 'BlogCode');
}

export function makeBlogPlot({plot}) {
    return makeStruct({plot}, 'BlogPlot');
}

export function makeBlogSectionContent({name, icon, title, paragraph, media}) {
    return makeStruct({name, icon, title, paragraph, media}, 'BlogSectionContent');
}
