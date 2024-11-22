import BaseBlog from "./base-blog";
import Cover from "./cpp-threads.webp"
import {SizeOptions} from "../utils/enums";

class CppThreads extends BaseBlog {
    constructor() {
        super({
            id: 'cpp-threads',
            title: 'Understanding Multi-Threading',
            description: 'Dive deep into concurrency',
            date: 'November 21, 2024',
            tags: ['C++', 'Concurrency', 'Threads'],
            cover: Cover,
            size: SizeOptions.Large
        })
    }

    content() {
        return `<div>Hello</div>`
    }
}

const cppThreads = new CppThreads();
export default cppThreads;