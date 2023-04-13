import hljs from "highlight.js";

export default function CodeBlock(props: any) {
  const { node, className } = props;
  const value = node.children[0].value;

  const highlightedCode = hljs.highlight(value, { language: "javascript" }).value;

  return (
    <pre className="py-2 bg-primary px-4 rounded-md my-1">
      <code className={className} dangerouslySetInnerHTML={{ __html: highlightedCode }}></code>
    </pre>
  );
}
