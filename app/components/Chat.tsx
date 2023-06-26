"use client";

import { useChat } from "ai/react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { css } from "@/styled-system/css";
import { Box, Button, Form, Input, TextArea } from "./components";

import { size } from "../constant";
import {
  FormEvent,
  KeyboardEventHandler,
  KeyboardEvent,
  useEffect,
  useRef,
} from "react";
import { SendIcon } from "./SendIcon";

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "system",
        content:
          '[If you answer with markdown code, you should precise the langage after the first three backticks like this: ```js\nconsole.log("Hello world")\n```]',
      },
    ],
  });

  const onEnterPress = (e: any) => {
    if (e.code === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      formRef.current?.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  };

  console.log("messages", messages);

  useEffect(() => {
    const textArea = textAreaRef.current;
    textArea?.addEventListener("input", () => {
      if (textArea !== null) {
        textArea.style.height = "auto";
        textArea.style.height = textArea.scrollHeight + "px";
      }
    });
    if (input === "") {
      textArea?.removeAttribute("style");
    }
    return () => {
      textArea?.removeEventListener("input", () => {});
    };
  }, [input]);

  return (
    <Box>
      <Box
        overflowY={"auto"}
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
      >
        {messages.map((message) => (
          <Box
            display={message.role === "system" ? "none" : "block"}
            key={message.id}
            alignSelf={message.role === "assistant" ? "flex-start" : "flex-end"}
            padding="16px"
            marginY="8px"
            borderRadius="20px"
            backgroundColor={
              message.role === "assistant" ? "gray.700" : "blue.500"
            }
            maxWidth="90%"
          >
            <ReactMarkdown
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
          </Box>
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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <TextArea
            ref={textAreaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={onEnterPress}
            borderRadius="20px"
            px="16px"
            py="8px"
            width="min(755px, calc(100vw * 0.8))"
            placeholder="Ecrivez un message"
            rows={1}
            autoFocus
            overflow="hidden"
            resize="none"
          />
          <Button
            type="submit"
            position="absolute"
            right="10px"
            bottom="calc(40px - 30px)"
            cursor={"pointer"}
          >
            <SendIcon
              fill={input === "" ? "#FFFFFF" : "#CC5AB9"}
              width={30}
              height={30}
              shapeRendering={"geometricPrecision"}
            />
          </Button>
        </Form>
      </Box>
    </Box>
  );
}
