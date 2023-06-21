import { css } from "../styled-system/css";
import Chat from "./components/Chat";
export default function Home() {
  return (
    <main>
      <h1 className={css({ fontSize: "2xl", fontWeight: "bold" })}>
        BenzouGPT
      </h1>
      <Chat />
    </main>
  );
}
