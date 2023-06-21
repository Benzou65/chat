"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
      <div style={{ display: "block", flexGrow: 1 }}>
        {messages.map((message) => (
          <ReactMarkdown
            key={message.id}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={vscDarkPlus}
                    language={match[1]}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ position: "absolute", bottom: 16 }}
      >
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
      </form>
    </div>
  );
}
