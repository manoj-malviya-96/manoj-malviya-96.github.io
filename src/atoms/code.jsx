import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vs2015 as codeStyle} from 'react-syntax-highlighter/dist/esm/styles/hljs'; // Choose a theme

// Import languages
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import matlab from 'react-syntax-highlighter/dist/esm/languages/hljs/matlab';
import qml from 'react-syntax-highlighter/dist/esm/languages/hljs/qml';
import AtomButton from "./atom-button";
import {useState} from "react";
import {ButtonOptions} from "../utils/enums";

// Register languages
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('matlab', matlab);
SyntaxHighlighter.registerLanguage('qml', qml);



const CodeBlock = ({ code, language, className }) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const [isCopying, setCopying] = useState(false);

    const handleCopy = async () => {
        try {
            setCopying(true);
            await navigator.clipboard.writeText(code);
            setCopying(false);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 1000); // Reset after 1 seconds
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <div className={`relative ${className}`}>
            {/* Copy Button */}
            <AtomButton
                behavior={isCopying ? ButtonOptions.Behavior.Loading : ButtonOptions.Behavior.Default}
                icon={copySuccess ? 'fas fa-check' : 'fas fa-copy'}
                label={copySuccess ? 'Copied!' : 'Copy'}
                onClick={handleCopy}
                className="absolute top-2 right-2 opacity-0 hover:opacity-100"
            />

            {/* Code Block */}
            <SyntaxHighlighter language={language} style={codeStyle} className="rounded-lg">
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;