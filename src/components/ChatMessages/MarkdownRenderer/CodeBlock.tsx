import React from "react";
import hljs from "highlight.js";
import { CodeProps } from "react-markdown/lib/ast-to-react";

export default function CodeBlock({ children, inline, node }: CodeProps) {
  if (inline) {
    return <code>{children}</code>;
  }

  // @ts-ignore
  const codeContent = node.children[0].value as string;
  const highlightedCode = hljs.highlight(codeContent.replace(/\`\`\`(\w+)?/gi, "").trim(), { language: "javascript" }).value;

  return (
    <pre className="dark:bg-zinc-950 rounded-md p-2 overflow-x-auto">
      <code dangerouslySetInnerHTML={{ __html: highlightedCode }}></code>
    </pre>
  );
}
