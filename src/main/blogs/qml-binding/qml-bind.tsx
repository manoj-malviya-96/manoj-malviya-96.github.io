import { BlogInfo } from "../blog-info";
import Cover from "./cover.webp";
import { AtomColumn, LayoutAlign } from "../../../atoms/atom-layout";
import React from "react";
import {
  AtomBoldText,
  AtomLink,
  AtomPrimaryText,
  AtomSubtitleText,
} from "../../../atoms/atom-text";
import AtomCodeBlock from "../../../atoms/atom-code";

const IntroSection = () => {
  return (
    <AtomColumn>
      <AtomPrimaryText>
        Qt and QML have been around for a while, but finding a solid,
        no-nonsense guide for small but meaningful optimizations? Not so easy.
        This isn’t about rewriting your entire QML app — just tiny 1.05% tweaks
        that, when stacked up, can make a big difference. Let’s talk Bindings —
        They’re a core part of QML, yet they’re often misunderstood or misused.
        So, let’s break it down and see how a few smart adjustments can make
        your QML apps run smoother and better.
      </AtomPrimaryText>
    </AtomColumn>
  );
};

const WhatAreProperties = () => {
  const staticAssignmentCode = `
QtQuick.Rectangle {
  width: 100 // Static Assignment, at compile time
}
        `;
  const dynamicAssignmentCode = `
QtQuick.Rectangle {
  width: parent.width / 2 // Dynamic, depends on parent and resizes when parent changes its width
}
        `;
  return (
    <AtomColumn alignment={LayoutAlign.Start}>
      <AtomPrimaryText>
        Properties in QML can be described as attributes, which can either be
        <AtomBoldText> static</AtomBoldText> (assigned at compile-time) or{" "}
        <AtomBoldText> dynamic</AtomBoldText> (reactive and updated at runtime).
      </AtomPrimaryText>

      <AtomColumn alignment={LayoutAlign.Start}>
        <AtomSubtitleText>Static Assignment</AtomSubtitleText>
        <AtomPrimaryText>
          Static properties are assigned once at compile-time and do not change
          at runtime. I advise to use static properties, when a value remains
          constant throughout the application’s lifecycle, such as fixed
          dimensions, colors, or configuration settings.
        </AtomPrimaryText>
        <AtomCodeBlock code={staticAssignmentCode} language={"qml"} />
      </AtomColumn>

      <AtomColumn alignment={LayoutAlign.Start}>
        <AtomSubtitleText>
          Dynamic Assignment / Property Binding
        </AtomSubtitleText>
        <AtomPrimaryText>
          A Property binding allows you to make the properties dynamic —
          creating link with either some function or another property using{" "}
          <AtomLink url={"https://doc.qt.io/qt-6/signalsandslots.html"}>
            signal and slot
          </AtomLink>{" "}
          mechanism. QML as a declarative language, we don’t have to write it
          manually :). In this case, the expression width: parent.width / 2
          creates a link between the rectangle's width and half of the parent's
          width, ensuring it updates automatically whenever parent.width
          changes. All of these are managed by QML’s event handler
        </AtomPrimaryText>
        <AtomCodeBlock code={dynamicAssignmentCode} language={"qml"} />
      </AtomColumn>
    </AtomColumn>
  );
};

class QmlBindings extends BlogInfo {
  constructor() {
    super({
      id: "qml-binding",
      title: "QML Bindings",
      description:
        "Using QML Binding properly in high performance application dev",
      date: "Feb 1, 2025",
      tags: ["QML", "Optimization", "Performance"],
      cover: Cover,
      isNew: true,
      summary:
        "This blog series is about what I have learned about QML in my past experience, how I use these practices at my current job and side projects.",
      sections: [
        {
          name: "intro",
          title: "Introduction",
          children: <IntroSection />,
        },
        {
          name: "minimize-bindings",
          title: "Minimize Bindings",
          children: <WhatAreProperties />,
        },
      ],
    });
  }
}

export default QmlBindings;
