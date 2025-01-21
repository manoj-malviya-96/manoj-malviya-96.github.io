import React, { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  github as lightStyle,
  irBlack as darkStyle,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import cpp from "react-syntax-highlighter/dist/esm/languages/hljs/cpp";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import matlab from "react-syntax-highlighter/dist/esm/languages/hljs/matlab";
import qml from "react-syntax-highlighter/dist/esm/languages/hljs/qml";
import { AtomButton, ButtonSize, ButtonType } from "./atom-button";
import { useTheme } from "../providers/theme";
import AtomStyledContainer from "./atom-styled-container";

// Register languages
SyntaxHighlighter.registerLanguage("cpp", cpp);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("matlab", matlab);
SyntaxHighlighter.registerLanguage("qml", qml);

// Define props interface
export interface CodeBlockProps {
  code: string;
  language: "cpp" | "javascript" | "python" | "matlab" | "qml";
  className?: string;
}

const AtomCodeBlock: React.FC<CodeBlockProps> = React.memo(
  ({ code, language, className = "" }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [isCopying, setCopying] = useState(false);
    const { isDark } = useTheme();

    const handleCopy = async () => {
      try {
        setCopying(true);
        await navigator.clipboard.writeText(code);
        setCopying(false);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 3000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };

    return (
      <AtomStyledContainer
        className={`relative w-full ${className}`}
        label={language}
      >
        <div className="absolute top-0 right-0 p-2">
          <AtomButton
            loading={isCopying}
            size={ButtonSize.Small}
            label={copySuccess ? "Copied" : "Copy"}
            icon={copySuccess ? "fas fa-check" : "fas fa-copy"}
            onClick={handleCopy}
            type={ButtonType.Ghost}
          />
        </div>
        {/* Code Block */}
        <SyntaxHighlighter
          language={language}
          style={isDark ? darkStyle : lightStyle}
          className="w-full h-fit"
        >
          {code}
        </SyntaxHighlighter>
      </AtomStyledContainer>
    );
  },
);

export default AtomCodeBlock;
