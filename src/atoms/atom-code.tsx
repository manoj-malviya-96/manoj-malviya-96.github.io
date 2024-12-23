import React, {useState} from "react";
import {Light as SyntaxHighlighter} from "react-syntax-highlighter";
import {github as lightStyle, irBlack as darkStyle} from "react-syntax-highlighter/dist/esm/styles/hljs"; // Choose a
// theme
// Import languages
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import matlab from "react-syntax-highlighter/dist/esm/languages/hljs/matlab";
import qml from "react-syntax-highlighter/dist/esm/languages/hljs/qml";
import {AtomButton, ButtonType} from "./atom-button";
import {useTheme} from "../providers/theme";

// Register languages
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("matlab", matlab);
SyntaxHighlighter.registerLanguage("qml", qml);

// Define props interface
export interface CodeBlockProps {
    code: string;
    language: "cpp" | "javascript" | "python" | "matlab" | "qml"; // Add
                                                                  // more
                                                                  // languages
                                                                  // as
                                                                  // needed
    className?: string;
}

const AtomCodeBlock: React.FC<CodeBlockProps> = ({
                                                 code,
                                                 language,
                                                 className = ""
                                             }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [isCopying, setCopying] = useState(false);
    const {isDark} = useTheme();
    
    const handleCopy = async () => {
        try {
            setCopying(true);
            await navigator.clipboard.writeText(code);
            setCopying(false);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 1000); // Reset
                                                           // after
                                                           // 1
                                                           // second
        }
        catch (err) {
            console.error("Failed to copy: ", err);
        }
    };
    
    return (
        <div className={`relative ${className}`}>
            <div className="bg-primary
                            flex flex-row w-full justify-between rounded-t-lg">
                <span className="p-2 text-small">{language}</span>
                {/* Copy Button */}
                <AtomButton
                    loading={isCopying}
                    icon={copySuccess ? "fas fa-check" : "fas fa-copy"}
                    label={copySuccess ? "Copied!" : "Copy"}
                    onClick={handleCopy}
                    type={ButtonType.Ghost}
                />
            </div>
            
            {/* Code Block */}
            <SyntaxHighlighter language={language}
                               style={isDark ? darkStyle : lightStyle}
                               className="rounded-b-lg border-b border-l border-r
                               border-secondary">
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default AtomCodeBlock;
