"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { css } from "@/styled-system/css";
import { Box, Form, Input } from "@/styled-system/components";
import { size } from "../constant";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <Box display="flex" flexWrap="wrap" flexDirection="column">
      <Box overflowY={"scroll"}>
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
              p({ node, className, children, ...props }) {
                return <p className={css({ color: "white" })}>{children}</p>;
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        ))}
      </Box>
      <Box
        position="fixed"
        bottom="16px"
        left="50%"
        transform="translateX(-50%)"
        display="flex"
        justifyContent="center"
      >
        <Form onSubmit={handleSubmit}>
          <Input
            value={input}
            onChange={handleInputChange}
            borderRadius="20px"
            px="16px"
            py="8px"
            width="min(755px, calc(100vw - 32px))"
            placeholder="Ecrivez un message"
          />
        </Form>
      </Box>
    </Box>
  );
}
