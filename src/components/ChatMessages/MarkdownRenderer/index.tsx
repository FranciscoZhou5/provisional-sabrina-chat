import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

interface IMarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: IMarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        p: ({ children }) => {
          return <p className="py-2">{children}</p>;
        },
        ul: ({ children }) => {
          return <ul className="list-disc pl-6"> {children} </ul>;
        },
        ol: ({ children }) => {
          return <ol className="list-decimal pl-6"> {children} </ol>;
        },
        li: ({ children }) => {
          return <li className="pt-2 pb-1"> {children} </li>;
        },
        code: CodeBlock,
        pre: ({ children }) => {
          return <>{children}</>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
