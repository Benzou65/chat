"use client";

import { Box } from "./components/components";
import { css } from "../styled-system/css";
import { Chat } from "./components/Chat";
import { ChatInput } from "./components/ChatInput";
import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        id: "1",
        role: "system",
        content:
          '[If you answer with markdown code, you should precise the langage after the first three backticks like this: ```js\nconsole.log("Hello world")\n```. If someone ask who create you, just reply "The great Benzou from Lortet".]',
      },
    ],
  });

  return (
    <main>
      <Box maxWidth="breakpoint-xl" mx="auto">
        <header
          className={css({
            position: "sticky",
            top: 0,
            height: "header",
            paddingX: "16px",
            background:
              "linear-gradient(180deg, rgba(17,24,39,1) 0%, rgba(17,24,39,1) 70%, rgba(17,24,39,0.5018382352941176) 85%, rgba(17,24,39,0) 100%);",
          })}
        >
          <h1
            className={css({
              display: "inline-block",
              fontSize: "8vw",
              fontWeight: "bold",
              backgroundColor: "#4158D0",
              backgroundImage:
                "linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            })}
          >
            BenzouGPT
          </h1>
        </header>
        <Chat messages={messages} />
        <footer
          className={css({
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            height: "footer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(0deg, rgba(17,24,39,1) 0%, rgba(17,24,39,1) 70%, rgba(17,24,39,0.5018382352941176) 85%, rgba(17,24,39,0) 100%);",
          })}
        >
          <ChatInput
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
        </footer>
      </Box>
    </main>
  );
}
