"use client";

import React, { useEffect, useRef } from "react";
import { Box, Form, TextArea, Button } from "./components";
import { SendIcon } from "./SendIcon";

type Props = {
  input: string;
  handleInputChange: (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const ChatInput: React.FC<Props> = ({
  input,
  handleInputChange,
  handleSubmit,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onEnterPress = (e: any) => {
    if (e.code === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      formRef.current?.dispatchEvent(new Event("submit", { bubbles: true }));
    }
  };

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
          placeholder="Écrivez un message"
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
  );
};
