"use client"
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const SyntaxHighlighteEdited = ({code} : {code: string}) => {
    return (
        <div className="overflow-scroll h-full">
        <SyntaxHighlighter language="javascript" style={docco}>
            {code}
        </SyntaxHighlighter>
    </div>
    )
}