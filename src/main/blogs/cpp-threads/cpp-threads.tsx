import {BlogInfo} from "../blog-info";
import Cover from "./cover.webp"
import {BentoItemSize} from "../../../atoms/atom-bentobox";
import {AtomColumn, AtomLayoutSize} from "../../../atoms/atom-layout";
import React from "react";
import {AtomPrimaryText} from "../../../atoms/atom-text";
import AtomCodeBlock from "../../../atoms/atom-code";


const SimpleThreadCode = () => {
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
	return <AtomColumn size={AtomLayoutSize.FullWidth}>
		<AtomPrimaryText>
			When I first explored C++ threads, it felt like entering a new world. C++’s
			<code>threads</code>
			library provides built-in multi-threading support, enabling concurrent execution.
			Initially, I thought it would be simple, but managing threads can be challenging.
		</AtomPrimaryText>
		<AtomCodeBlock code={simpleThreadCode} language={'cpp'}/>
	</AtomColumn>
}

const RaceConditions = () => {
	return (
		<AtomColumn>
			<AtomPrimaryText>
				One of the first things I ran into was race condition.
				It’s like having multiple people trying to update the same
				Excel file simultaneously—everyone thinks they're editing the
				latest version, but chaos ensues. <br/>
				Let me paint a picture: I had a shared inventory map
				that stored the stock count of different items.
				Imagine multiple threads trying to update this map at the same time.
				It might look something like this: Here's an example code snippet:
				<code>{`std::map<std::string, int> inventory;`}</code>
			</AtomPrimaryText>
		</AtomColumn>
	)
}

const UsingMutexes = () => {
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
	return (
		<AtomColumn>
			<AtomPrimaryText>
				A mutex is like a bouncer at a club, ensuring that only one person can enter a specific
				area at a time. This prevents a total meltdown caused by multiple people trying to access
				the same thing at the same time. <br/>
			</AtomPrimaryText>
			<AtomCodeBlock code={mutexCode} language={'cpp'} className={'w-full'}/>
		</AtomColumn>
	)
}


const LockGuard = () => {
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
	return (
		<AtomColumn>
			<AtomPrimaryText>
				Manually locking and unlocking a mutex felt like juggling with one too many
				balls in the air. I discovered <code>std::lock_guard</code>, which automatically locks and
				unlocks the mutex for you—much less risky.
			</AtomPrimaryText>
			<AtomCodeBlock code={lockGuardCode} language={'cpp'} className={'w-full'}/>
		</AtomColumn>
	)
}


const AtomicValues = () => {
	const atomicCode = `
std::map<std::string, std::atomic<int>> inventory; // Shared resource
void restock(const std::string& item, int quantity) {
    inventory[item] += quantity;
    std::cout << "Restocked " << quantity
                << " units of " << item << std::endl;
}
        `
	return (
		<AtomColumn>
			<AtomPrimaryText>
				Atomic variables are like superheroes with superpowers—able to perform
				operations atomically without any interference. They ensure that operations
				on the variable are indivisible
			</AtomPrimaryText>
			<AtomCodeBlock code={atomicCode} language={'cpp'} className={'w-full'}/>
		</AtomColumn>
	)
}

class CppThreads extends BlogInfo {
	constructor() {
		super({
			id: 'cpp-threads',
			title: 'Multi-Threading',
			description: 'Dive deep into concurrency',
			date: 'Nov 21, 2024',
			tags: ['C++', 'Concurrency', 'Threads'],
			cover: Cover,
			isNew: true,
			category: 'Programming',
			cardSize: BentoItemSize.Small,
			summary: `Multi-threading in programming sounds simple, but it’s complex. I used it to speed up a project,
            but it wasn’t as easy as launching threads. This post covers essentials like mutexes, lock guards,
            unique locks, and atomic variables. I’ll share a real-world example: managing an inventory map in a
            multi-threaded environment.`,
			sections: [
				{
					name: 'intro',
					title: 'Introduction',
					children: <SimpleThreadCode/>
				},
				{
					name: 'race-conditions',
					title: 'Race Conditions',
					children: <RaceConditions/>
				},
				{
					name: 'mutexes',
					title: 'Using Mutexes',
					children: <UsingMutexes/>
				},
				{
					name: 'lock-guards',
					title: 'Lock Guards',
					children: <LockGuard/>
				},
				{
					name: 'atomic-values',
					title: 'Atomic Values',
					children: <AtomicValues/>
				},
			]
		});
	}
}

export default CppThreads;