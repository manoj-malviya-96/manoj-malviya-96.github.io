import {Light as SyntaxHighlighter} from 'react-syntax-highlighter';
import {vs2015 as codeStyle} from 'react-syntax-highlighter/dist/esm/styles/hljs'; // Choose a theme

// Import languages
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import matlab from 'react-syntax-highlighter/dist/esm/languages/hljs/matlab';
import qml from 'react-syntax-highlighter/dist/esm/languages/hljs/qml';

// Register languages
SyntaxHighlighter.registerLanguage('cpp', cpp);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('matlab', matlab);
SyntaxHighlighter.registerLanguage('qml', qml);

// Reusable CodeBlock Component
const CodeBlock = ({code, language}) => (
    <div className="overflow-x-auto">
        <SyntaxHighlighter language={language} style={codeStyle} className="rounded-lg bg-base-300 p-4">
            {code}
        </SyntaxHighlighter>
    </div>
);
export default CodeBlock;
