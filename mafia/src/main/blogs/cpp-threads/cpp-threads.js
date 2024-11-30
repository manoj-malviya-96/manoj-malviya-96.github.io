import {BlogInfo, makeBlogCode, makeBlogSectionContent} from "../blog-info";
import Cover from "./cover.webp"
import {BentoboxSizeOption} from "../../../utils/enums";

class CppThreads extends BlogInfo {
    constructor() {
        const simpleThreadsExample = makeBlogSectionContent(
            {
                name: 'example',
                icon: 'fa fa-info-circle',
                title: 'Simple Example',
                paragraph: (`<p>When I first started exploring C++ threads, it was like stepping into an entirely new territory. C++ has
                built-in support for multi-threading via the <code>&lt;thread&gt;</code> library.
                The basic idea is that
                a thread runs a separate flow of execution, allowing you to do multiple things at once. At first, I
                thought, “How hard can this be?”—but as I quickly found out, threads can get pretty wild if you don't
                manage them carefully.</p>`),
                media: makeBlogCode({
                    language: 'cpp', code: '#include iostream;\n' +
                        '#include thread;\n' +
                        '\n' +
                        'void print_message() {\n' +
                        '    std::cout: "Hello from a thread!" &lt;&lt; std::endl;\n' +
                        '}\n' +
                        '\n' +
                        'int main() {\n' +
                        '    std::thread t(print_message); // Create a thread to run print_message\n' +
                        '    t.join(); // Wait for the thread to finish\n' +
                        '    return 0;'
                })
            });

        const raceConditions = makeBlogSectionContent({
            name: 'race-conditions',
            icon: 'fa fa-person-running',
            title: 'Race conditions',
            paragraph: (`<p>One of the first things I ran into was a <strong>race condition</strong>. It’s like having multiple
                people trying to update the same Excel file simultaneously—everyone thinks they're editing the latest
                version, but chaos ensues. Let me paint a picture: I had a shared <strong>inventory map</strong> that
                stored the stock count of different items. Imagine multiple threads trying to update this map at the same time. It might look something like
                this:</p>`),
            media: makeBlogCode({
                language: 'cpp', code: '#include iostream;\n' +
                    '#include thread;\n' +
                    '\n' +
                    'void print_message() {\n' +
                    '    std::cout: "Hello from a thread!" &lt;&lt; std::endl;\n' +
                    '}\n' +
                    '\n' +
                    'int main() {\n' +
                    '    std::thread t(print_message); // Create a thread to run print_message\n' +
                    '    t.join(); // Wait for the thread to finish\n' +
                    '    return 0;'
            })
        });
        super({
            id: 'cpp-threads',
            title: 'Multi-Threading',
            description: 'Dive deep into concurrency',
            date: 'Nov 21, 2024',
            tags: ['C++', 'Concurrency', 'Threads'],
            cover: Cover,
            card_size: BentoboxSizeOption.Regular,
            isNew: true,
            summary: 'Multi-threading is one of those things in programming that sounds easy in theory, but once you dive in, you quickly realize it’s a whole different beast. I remember when I started working on a project where I needed to speed up some operations, and multi-threading seemed like the perfect solution. Spoiler alert: it wasn’t as straightforward as just launching a few threads.\n' +
                '\n' +
                'In this post, I’ll walk you through what I learned while navigating the world of multi-threading in C++. I’ll cover some essentials like mutexes, lock guards, unique locks, and atomic variables and share a real-world example that helped me wrap my head around these concepts—managing an inventory map in a multi-threaded environment.',
            sections: [simpleThreadsExample, raceConditions]
        });
    }
}

const cppThreadsInstance = new CppThreads();
export default cppThreadsInstance;