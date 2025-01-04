import { BlogInfo } from "../blog-info";
import Cover from "./cover.webp";
import { BlogSectionContentProps } from "../blog-constructor";
import { BentoItemSize } from "../../../atoms/atom-bentobox";

class QmlOptimization extends BlogInfo {
	constructor() {
		const minimizeBindingsCode = `
// Bad
Rectangle {
    width: parent.width / 2  // Causes unnecessary re-evaluations
}

// Good
Rectangle {
    width: 200  // Direct assignment avoids overhead
}

// Better
Rectangle {
    Component.onCompleted: width = parent.width / 2 // Delays calculation until initialization
}
        `;
		
		const minimizeBindingsSection: BlogSectionContentProps = {
			name: "minimize-bindings",
			title: "Minimize Bindings and Property Evaluations",
			paragraph: [
				"Bindings in QML are powerful for creating reactive UIs, but excessive use can cause performance bottlenecks. Reduce bindings or delay their evaluation where possible."
			],
			media: { kind: "code", language: "qml", code: minimizeBindingsCode },
		};
		
		const animationEfficiencyCode = `
// Bad
Rectangle {
    color: "blue"
    Behavior on x {
        PropertyAnimation { duration: 1000; easing.type: Easing.InOutBounce }
    }
}

// Good
Rectangle {
    color: "blue"
    NumberAnimation on x { to: 100; duration: 500 }
}

// Better
Rectangle {
    color: "blue"
    SequentialAnimation {
        NumberAnimation { to: 50; duration: 250 }
        NumberAnimation { to: 100; duration: 250 }
    }
}
        `;
		
		const animationEfficiencySection: BlogSectionContentProps = {
			name: "animation-efficiency",
			title: "Efficient Animations",
			paragraph: [
				"Animations bring life to applications, but too many animations or complex easing curves can degrade performance. Opt for sequential animations and simpler curves when possible."
			],
			media: { kind: "code", language: "qml", code: animationEfficiencyCode },
		};
		
		const imageOptimizationCode = `
// Bad
Image {
    source: "large_image.png"
    width: 5000; height: 5000
}

// Good
Image {
    source: "optimized_image.jpg"
    width: 200; height: 200  // Match the actual display size
}

// Better
Image {
    source: "optimized_image.jpg"
    width: 200; height: 200
    asynchronous: true  // Load asynchronously to prevent UI blocking
}
        `;
		
		const imageOptimizationSection: BlogSectionContentProps = {
			name: "image-optimization",
			title: "Image Optimization",
			paragraph: [
				"Loading large or unoptimized images can slow down your application. Use appropriately sized images and load them asynchronously to improve performance."
			],
			media: { kind: "code", language: "qml", code: imageOptimizationCode },
		};
		
		const threadingOptimizationCode = `
// Bad
ListView {
    model: ListModel {
        id: largeDataModel  // Synchronous loading causes UI blocking
    }
}

// Good
ListView {
    model: ListModel {
        // Dynamically populate data
    }
    asynchronous: true
}

// Better
WorkerScript {
    id: backgroundLoader
    source: "loadData.js"  // Offload data fetching to a background thread
}
ListView {
    model: largeDataModel
    Component.onCompleted: backgroundLoader.sendMessage()
}
        `;
		
		const threadingOptimizationSection: BlogSectionContentProps = {
			name: "threading-and-asynchronous",
			title: "Threading and Asynchronous Operations",
			paragraph: [
				"Heavy computations or data loading should be offloaded to worker threads to keep the UI responsive. Use asynchronous models or WorkerScript where applicable."
			],
			media: { kind: "code", language: "qml", code: threadingOptimizationCode },
		};
		
		const renderingOptimizationCode = `
// Bad
Rectangle {
    width: 100; height: 100
    border.width: 1; color: "red"
}

// Good
Rectangle {
    width: 100; height: 100
    layer.enabled: true  // Uses offscreen layer for static items
}

// Better
Rectangle {
    width: 100; height: 100
    cache: true  // Cache rendering for better performance
}
        `;
		
		const renderingOptimizationSection: BlogSectionContentProps = {
			name: "rendering-efficiency",
			title: "Rendering Efficiency",
			paragraph: [
				"Rendering performance can be improved by reducing overdraw, enabling layers for static items, and caching frequently rendered components."
			],
			media: { kind: "code", language: "qml", code: renderingOptimizationCode },
		};
		
		const profilingToolsCode = `
// Profiling Example
// Use the QML Profiler in Qt Creator to identify bottlenecks
ApplicationWindow {
    Component.onCompleted: {
        console.log("FPS:", QQuickWindow.framesPerSecond())
    }
}
        `;
		
		const profilingToolsSection: BlogSectionContentProps = {
			name: "profiling-tools",
			title: "Profile and Monitor Performance",
			paragraph: [
				"Always profile your application to identify bottlenecks. Qt Creator's QML Profiler is a powerful tool to analyze and optimize performance."
			],
			media: { kind: "code", language: "qml", code: profilingToolsCode },
		};
		
		super({
			id: "qml-optimization",
			title: "QML Bests",
			description: "Learn practical ways to improve performance in QML applications.",
			date: "December 30, 2024",
			tags: ["QML", "Optimization", "Performance"],
			cover: Cover,
			isNew: true,
			cardSize: BentoItemSize.Medium,
			summary: "A comprehensive guide to optimizing QML applications, with best practices, examples, and practical tips for improving performance.",
			sections: [
				minimizeBindingsSection,
				animationEfficiencySection,
				imageOptimizationSection,
				threadingOptimizationSection,
				renderingOptimizationSection,
				profilingToolsSection,
			],
		});
	}
}

const qmlOptimizationInstance = new QmlOptimization();
export default qmlOptimizationInstance;
