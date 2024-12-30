import {BlogInfo} from "../blog-info";
import Cover from "./cover.webp"
import {BlogCodeProps, BlogSectionContentProps} from "../blog-constructor";
import {BentoItemSize} from "../../../atoms/atom-bentobox";

class CppThreads extends BlogInfo {
    constructor() {
        const simpleThreadCode = `
void print_message() {
    std::cout << "Hello from a thread!" << std::endl;
}

int main() {
    std::thread t(print_message); // Create a thread to run print_message
    t.join(); // Wait for the thread to finish
    return 0;
}
    `;
        const simpleThreadsExample: BlogSectionContentProps = {
            name: 'example',
            title: 'Simple Example',
            paragraph: [
                `When I first explored C++ threads, it felt like entering a new world. C++’s `,
                {tag: 'code', children: '<thread>'},
                ` library provides built-in multi-threading support, enabling concurrent execution. 
                   Initially, I thought it would be simple, but managing threads can be challenging.`
            ],
            media: {
                kind: 'code',
                language: 'cpp',
                code: simpleThreadCode
            }
        };
        
        const raceConditions: BlogSectionContentProps = {
            name: 'race-conditions',
            title: 'Race conditions',
            paragraph: [
                `One of the first things I ran into was a race condition.
                 It’s like having multiple people trying to update the same 
                 Excel file simultaneously—everyone thinks they're editing the 
                 latest version, but chaos ensues.`,
                {tag: 'br'},
                `Let me paint a picture: I had a shared inventory map
                 that stored the stock count of different items.
                 Imagine multiple threads trying to update this map at the same time.
                 It might look something like this: Here's an example code snippet:`
            ],
            media: {
                kind: 'code',
                language: 'cpp', code:
                    `
std::map<std::string, int> inventory;
                `
            }
        }
        
        
        const mutexCode = `    
std::map<std::string, int> inventory; // Shared resource
std::mutex inventory_mutex; // Mutex to protect the shared map

void restock(const std::string& item, int quantity) {
    std::lock_guard<std::mutex> lock(inventory_mutex); // Locking the mutex
    inventory[item] += quantity;
    std::cout << "Restocked " << quantity 
                << " units of " << item << std::endl;
}

void sell(const std::string& item, int quantity) {
    // Locking the mutex
    std::lock_guard<std::mutex> lock(inventory_mutex); 
    if (inventory[item] >= quantity) {
        inventory[item] -= quantity;
        std::cout << "Sold " << quantity << " units of " 
                    << item << std::endl;
    } else {
        std::cout << "Not enough stock to sell " << quantity 
                    << " units of " << item << std::endl;
    }
}`;
        const mutexExample: BlogSectionContentProps = {
            name: 'mutex-example',
            title: 'Mutexes',
            paragraph: [
                `A mutex is like a bouncer at a club, ensuring that only one person can enter a specific
                 area at a time. This prevents a total meltdown caused by multiple people trying to access
                 the same thing at the same time.`
                , {tag: 'br'},
            ],
            media: {kind: 'code', language: 'cpp', code: mutexCode}
        };
        
        const lockGuardCode = `
void restock(const std::string& item, int quantity) {
    // Automatically locks and unlocks the mutex
    std::lock_guard<std::mutex> lock(inventory_mutex); 
    inventory[item] += quantity;
    std::cout << "Restocked " << quantity 
                << " units of " << item << std::endl;
}

void sell(const std::string& item, int quantity) {
    std::lock_guard<std::mutex> lock(inventory_mutex);
    if (inventory[item] >= quantity) {
        inventory[item] -= quantity;
        std::cout << "Sold " << quantity << " units of " 
                    << item << std::endl;
    } else {
        std::cout << "Not enough stock to sell " << quantity 
                    << " units of " << item << std::endl;
    }
}
`;
        const lockGuards: BlogSectionContentProps = {
            name: 'lock-guards',
            title: 'Lock Guards',
            paragraph: [
                `Manually locking and unlocking a mutex felt like juggling with one too many 
                    balls in the air. I discovered `,
                {tag: 'code', children: `std::lock_guard`},
                `, which automatically locks and 
                    unlocks the mutex for you—much less risky.`
            ],
            media: {
                kind: 'code',
                language: 'cpp',
                code: lockGuardCode
            } as BlogCodeProps
        }
        
        const atomicCode = `
std::map<std::string, std::atomic<int>> inventory; // Shared resource
void restock(const std::string& item, int quantity) {
    inventory[item] += quantity;
    std::cout << "Restocked " << quantity
                << " units of " << item << std::endl;
}
        `
        const atomicValues: BlogSectionContentProps = {
            name: 'atomic-values',
            title: 'Atomic Variables',
            paragraph: [
                `Atomic variables are like superheroes with superpowers—able to perform 
                operations atomically without any interference. They ensure that operations
                on the variable are indivisible, preventing race conditions.`
            ],
            media: {kind: 'code', language: 'cpp', code: atomicCode}
        };
        
        super({
            id: 'cpp-threads',
            title: 'Multi-Threading',
            description: 'Dive deep into concurrency',
            date: 'Nov 21, 2024',
            tags: ['C++', 'Concurrency', 'Threads'],
            cover: Cover,
            isNew: true,
            cardSize: BentoItemSize.Medium,
            summary: `Multi-threading in programming sounds simple, but it’s complex. I used it to speed up a project, 
            but it wasn’t as easy as launching threads. This post covers essentials like mutexes, lock guards,
            unique locks, and atomic variables. I’ll share a real-world example: managing an inventory map in a
            multi-threaded environment.`,
            sections: [simpleThreadsExample, raceConditions, mutexExample, lockGuards, atomicValues]
        });
    }
}

const cppThreadsInstance = new CppThreads();
export default cppThreadsInstance;