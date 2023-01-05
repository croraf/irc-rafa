import { useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chat/chatSlice";
import { ChatInput } from "./ChatInput";

export const MainChatPanel = () => {
  const activeChannel = useAppSelector(selectActiveChannel);

  return (
    <>
      {activeChannel === null ? (
        <div style={{ width: "100%", textAlign: "center", padding: "1rem" }}>
          Select channel
        </div>
      ) : (
        <>
          <div style={{ flexGrow: 2, padding: "0.5rem" }}>Chat history</div>
          <ChatInput />
        </>
      )}
    </>
  );
};
