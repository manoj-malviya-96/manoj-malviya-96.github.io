import {SizeOptions} from "../utils/enums";
import {BentoBoxItem} from "../utils/types";

class BaseBlog {
    constructor({id, title, description, date, tags, cover, size= SizeOptions.Medium}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.tags = tags;
        this.cover = cover;
        this.size = size
    }

    bentobox() {
        return new BentoBoxItem(
            this.title,
            this.description,
            this.date,
            this.tags,
            this.cover,
            this.size,
            this.path()
        )
    }

    path() {
        return '/blogs/' + this.id;
    }

    content() {
        throw new Error("Abstract method 'content()' must be implemented by subclasses.");
    }
}

export default BaseBlog;