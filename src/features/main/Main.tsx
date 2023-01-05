import { ChatInput } from "./ChatInput";

export const Main = () => {
  return (
    <main
      style={{
        flexGrow: 2,
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
      }}
    >
      <div style={{ flexGrow: 2, padding: "0.5rem" }}>Chat history</div>
      <ChatInput />
    </main>
  );
};
