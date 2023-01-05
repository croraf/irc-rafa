import { useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chat/chatSlice";
import { ChatInput } from "./ChatInput";

export const Main = () => {
  const activeChannel = useAppSelector(selectActiveChannel);

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
      {activeChannel === null ? (
        <div style={{ width: "100%", textAlign: "center", margin: "1rem" }}>
          Select channel
        </div>
      ) : (
        <>
          <div style={{ flexGrow: 2, padding: "0.5rem" }}>Chat history</div>
          <ChatInput />
        </>
      )}
    </main>
  );
};
