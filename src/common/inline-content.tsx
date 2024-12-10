import React from "react";

// Define the types
export interface InlineContent {
    tag: string;
    props?: Record<string, any>;
    children?: React.ReactNode | React.ReactNode[];
}

export type InlineContentType =
    string
    | InlineContent[]
    | InlineContent;

// Type guard to check if an item is InlineContent
function isInlineContent(item: unknown): item is InlineContent {
    return typeof item === "object" && item !== null && "tag" in item;
}

// Render a single inline element
function renderInlineElement(item: InlineContent, key: number): React.ReactNode {
    return React.createElement(
        item.tag,
        {
            key,
            ...item.props,
            className: `${item.props?.className || ""} ${
                item.tag === "code" ? "text-info px-1" : ""
            }`.trim(),
        },
        item.children
    );
}

// Render inline content within a paragraph
function renderInlineContent(content: InlineContent[], key: number): React.ReactNode {
    return (
        <p key={key}>
            {content.map((item, subIndex) =>
                typeof item === "string" ? item : renderInlineElement(item, subIndex)
            )}
        </p>
    );
}

// Render a standalone tag (e.g., <br>, <hr>)
function renderStandaloneTag(content: InlineContent, key: number): React.ReactNode {
    return React.createElement(content.tag, {key, ...content.props});
}

// Main function to render paragraphs
export function makeRichParagraph(contentArray: InlineContentType[]): React.ReactNode {
    return contentArray.map((content, index) => {
        if (typeof content === "string") {
            // Render plain string as a paragraph
            return <p key={index}>{content}</p>;
        } else if (Array.isArray(content)) {
            // Render inline content
            return renderInlineContent(content, index);
        } else if (isInlineContent(content)) {
            // Render standalone tags
            return renderStandaloneTag(content, index);
        }
        return null; // Handle invalid content gracefully
    });
}
