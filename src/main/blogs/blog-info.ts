import {rangesTo} from "../../common/math";
import {getScaleColor} from "../../common/color-utils";
import {BentoItemSize} from "../../atoms/atom-bentobox";
import {BlogSectionContentProps} from "./blog-constructor";
import {TableOfContentsItemProps} from "../../atoms/atom-table-of-contents";

export type categoryType = "Programming" | "Projects" | "Life";

interface BlogInfoConstructor {
    id: string;
    title: string;
    description: string;
    summary: string;
    date: string;
    tags: string[];
    cover: string;
    sections: BlogSectionContentProps[];
    logo?: string;
    isNew?: boolean; // Optional with a default value.
    cardSize?: BentoItemSize;
    category?: categoryType;
}

export class BlogInfo {
    private readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly summary: string;
    readonly date: string; // Use `Date` if needed.
    readonly tags: string[];
    readonly cover: string;
    readonly logo: string;
    readonly category: categoryType | undefined;
    readonly sections: BlogSectionContentProps[];
    readonly isNew: boolean;
    readonly path: string;
    readonly cardSize: BentoItemSize = BentoItemSize.Small;
    
    
    constructor({
                    id,
                    title,
                    description,
                    summary,
                    date,
                    tags,
                    cover,
                    sections,
                    category,
                    cardSize,
                    logo = '',
                    isNew = false,
                }: BlogInfoConstructor) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.summary = summary;
        this.date = date;
        this.tags = tags;
        this.cover = cover;
        this.logo = logo;
        this.sections = sections;
        this.isNew = isNew;
        this.category = category;
        this.cardSize= cardSize ? cardSize: BentoItemSize.Small;
        this.path = '/blogs/' + this.id;
    }
    
    tabs() {
        return rangesTo(this.sections, (section) => {
            return {
                name: section.name,
                label: section.title,
            } as TableOfContentsItemProps;
        });
    }
}

export const heatmapColorScale =
    getScaleColor("rgb(239,153,50)", "rgba(109,161,236,0.87)", 8);
