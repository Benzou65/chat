import { Box } from "./components/components";
import { css } from "../styled-system/css";
import Chat from "./components/Chat";
import { size } from "./constant";
export default function Home() {
  return (
    <main
      className={css({
        paddingX: "16px",
        backgroundColor: "gray.900",
        height: "100svh",
      })}
    >
      <Box maxWidth="breakpoint-xl" mx="auto">
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
            height: size.HEADER,
          })}
        >
          BenzouGPT
        </h1>
        <Chat />
      </Box>
    </main>
  );
}
