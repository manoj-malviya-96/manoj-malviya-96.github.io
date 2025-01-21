import { BlogInfo } from "../blog-info";
import Cover from "./cover.webp";
import { AtomColumn } from "../../../atoms/atom-layout";
import React from "react";
import { AtomPrimaryText } from "../../../atoms/atom-text";
import AtomCodeBlock from "../../../atoms/atom-code";

const IntroSection = () => {
  return (
    <AtomColumn>
      <AtomPrimaryText>
        QML is a powerful language for building fluid and interactive user
        interfaces. However, performance optimization is crucial for delivering
        a smooth user experience. Here are some tips to help you optimize your
        QML applications.
      </AtomPrimaryText>
    </AtomColumn>
  );
};

const MinimizeBindingsSection = () => {
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
  return (
    <AtomColumn>
      <AtomPrimaryText>
        Bindings in QML are powerful for creating reactive UIs, but excessive
        use can cause performance bottlenecks. Reduce bindings or delay their
        evaluation where possible.
      </AtomPrimaryText>
      <AtomCodeBlock code={minimizeBindingsCode} language={"qml"} />
    </AtomColumn>
  );
};

const AnimationEfficiencySection = () => {
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
  return (
    <AtomColumn>
      <AtomPrimaryText>
        Animations bring life to applications, but too many animations or
        complex easing curves can degrade performance. Opt for sequential
        animations and simpler curves when possible.
      </AtomPrimaryText>
      <AtomCodeBlock code={animationEfficiencyCode} language={"qml"} />
    </AtomColumn>
  );
};

const ImageOptimizationSection = () => {
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
  return (
    <AtomColumn>
      <AtomPrimaryText>
        Loading large or unoptimized images can slow down your application. Use
        appropriately sized images and load them asynchronously to improve
        performance.
      </AtomPrimaryText>
      <AtomCodeBlock code={imageOptimizationCode} language={"qml"} />
    </AtomColumn>
  );
};

const ThreadingOptimizationSection = () => {
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
  return (
    <AtomColumn>
      <AtomPrimaryText>
        Heavy computations or data loading should be offloaded to worker threads
        to keep the UI responsive. Use asynchronous models or WorkerScript where
        applicable.
      </AtomPrimaryText>
      <AtomCodeBlock code={threadingOptimizationCode} language={"qml"} />
    </AtomColumn>
  );
};

const RenderingOptimizationSection = () => {
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
  return (
    <AtomColumn>
      <AtomPrimaryText>
        Rendering performance can be improved by reducing overdraw, enabling
        layers for static items, and caching frequently rendered components.
      </AtomPrimaryText>
      <AtomCodeBlock code={renderingOptimizationCode} language={"qml"} />
    </AtomColumn>
  );
};

class QmlOptimization extends BlogInfo {
  constructor() {
    super({
      id: "qml-optimization",
      title: "QML Bests",
      description:
        "Learn practical ways to improve performance in QML applications.",
      date: "December 30, 2024",
      tags: ["QML", "Optimization", "Performance"],
      cover: Cover,
      isNew: true,
      summary:
        "A comprehensive guide to optimizing QML applications, with best practices, examples, and practical tips for improving performance.",
      sections: [
        {
          name: "intro",
          title: "Introduction",
          children: <IntroSection />,
        },
        {
          name: "minimize-bindings",
          title: "1. Minimize Bindings",
          children: <MinimizeBindingsSection />,
        },
        {
          name: "animation-efficiency",
          title: "2. Animation Efficiency",
          children: <AnimationEfficiencySection />,
        },
        {
          name: "image-optimization",
          title: "3. Image Optimization",
          children: <ImageOptimizationSection />,
        },
        {
          name: "threading-optimization",
          title: "4. Threading Optimization",
          children: <ThreadingOptimizationSection />,
        },
        {
          name: "rendering-optimization",
          title: "5. Rendering Optimization",
          children: <RenderingOptimizationSection />,
        },
      ],
    });
  }
}

export default QmlOptimization;
