import {BaseBlog, makeBlogImage, makeBlogSectionContent} from "./base-blog";
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
            card_size: SizeOptions.Large,
            summary: 'Multi-threading is one of those things in programming that sounds easy in theory, but once you dive in, you quickly realize it’s a whole different beast. I remember when I started working on a project where I needed to speed up some operations, and multi-threading seemed like the perfect solution. Spoiler alert: it wasn’t as straightforward as just launching a few threads.\n' +
                '\n' +
                'In this post, I’ll walk you through what I learned while navigating the world of multi-threading in C++. I’ll cover some essentials like mutexes, lock guards, unique locks, and atomic variables and share a real-world example that helped me wrap my head around these concepts—managing an inventory map in a multi-threaded environment.',
            sections: [
                makeBlogSectionContent(
                    {
                        name: 'intro',
                        icon: 'fa fa-info-circle',
                        title: 'Introduction',
                        paragraph: 'Something Something on the way',
                        media: makeBlogImage({source: Cover, label: 'Cover'}),
                    })
            ]
        })
    }
}

const cppThreads = new CppThreads();
export default cppThreads;