import {BlogInfo, makeBlogCode, makeBlogImage, makeBlogSectionContent} from "../blog-info";
import Cover from "./cover.webp"
import {BentoboxSizeOption} from "../../../utils/enums";

class CppThreads extends BlogInfo {
    constructor() {
        const simpleThreadsExample = makeBlogSectionContent({
            name: 'example',
            icon: 'fa fa-info-circle',
            title: 'Simple Example',
            paragraph: [
                [
                    "When I first explored C++ threads, it felt like entering a new world. C++’s ",
                    {tag: 'code', children: '<thread>'},
                    " library provides built-in multi-threading support, enabling concurrent execution. Initially, I thought it would be simple, but managing threads can be challenging."
                ]
            ],
            media: makeBlogCode({
                language: 'cpp',
                code: `
#include <iostream>
#include <thread>

void print_message() {
    std::cout << "Hello from a thread!" << std::endl;
}

int main() {
    std::thread t(print_message); // Create a thread to run print_message
    t.join(); // Wait for the thread to finish
    return 0;
}
            `
            })
        });
        const raceConditions = makeBlogSectionContent({
            name: 'race-conditions',
            icon: 'fa fa-person-running',
            title: 'Race conditions',
            paragraph: [
                [
                    "One of the first things I ran into was a ",
                    {tag: 'strong', children: 'race condition'},
                    ". It’s like having multiple people trying to update the same Excel file simultaneously—everyone " +
                    "thinks they're editing the latest version, but chaos ensues."
                ],
                {tag: 'br'},
                [
                    "Let me paint a picture: I had a shared ",
                    {tag: 'strong', children: 'inventory map'},
                    " that stored the stock count of different items. " +
                    "Imagine multiple threads trying to update this map at the same time. " +
                    "It might look something like this:"
                ],
                {tag: 'br'},
                [
                    "Here's an example code snippet: ",
                    {tag: 'code', children: 'std::map<std::string, int> inventory;'}
                ]
            ],
            media: makeBlogCode({language: 'cpp', code:
                `
std::map<std::string, int> inventory;
                `
        })});


        const mutexExample = makeBlogSectionContent({
            name: 'mutex-example',
            icon: 'fa fa-lock',
            title: 'Mutexes',
            paragraph: [
                [ "A mutex is like a bouncer at a club, ensuring that only one person can enter a specific " +
                "area at a time. This prevents a total meltdown caused by multiple people trying to access " +
                "the same thing at the same time."
                ]
            ],
            media: makeBlogCode({language: 'cpp', code: `
#include <iostream>
#include <thread>
#include <map>
#include <mutex>

std::map<std::string, int> inventory; // Shared resource
std::mutex inventory_mutex; // Mutex to protect the shared map

void restock(const std::string& item, int quantity) {
    std::lock_guard<std::mutex> lock(inventory_mutex); // Locking the mutex
    inventory[item] += quantity;
    std::cout << "Restocked " << quantity << " units of " << item << std::endl;
}

void sell(const std::string& item, int quantity) {
    std::lock_guard<std::mutex> lock(inventory_mutex); // Locking the mutex
    if (inventory[item] >= quantity) {
        inventory[item] -= quantity;
        std::cout << "Sold " << quantity << " units of " << item << std::endl;
    } else {
        std::cout << "Not enough stock to sell " << quantity << " units of " << item << std::endl;
    }
}
        `})});

        super({
            id: 'cpp-threads',
            title: 'Multi-Threading',
            description: 'Dive deep into concurrency',
            date: 'Nov 21, 2024',
            tags: ['C++', 'Concurrency', 'Threads'],
            cover: Cover,
            card_size: BentoboxSizeOption.Regular,
            isNew: true,
            summary: "Multi-threading in programming sounds simple, but it’s complex. I used it to speed up a project, " +
                "but it wasn’t as easy as launching threads. This post covers essentials like mutexes, lock guards, " +
                "unique locks, and atomic variables. I’ll share a real-world example: managing an inventory map in a " +
                "multi-threaded environment",
            sections: [simpleThreadsExample, raceConditions, mutexExample]
        });
    }
}

const cppThreadsInstance = new CppThreads();
export default cppThreadsInstance;