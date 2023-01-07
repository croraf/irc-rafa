import { useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chatHistorySlice/chatHistorySlice";
import { UsersList } from "../usersList/UsersList";
import { ChatHistory } from "./ChatHistory";
import { ChatInput } from "./ChatInput";

export const MainChatPanel = () => {
  const activeChannel = useAppSelector(selectActiveChannel);

  return (
    <>
      <div
        style={{
          flexGrow: 2,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(64,67,83)",
        }}
      >
        {activeChannel === null ? (
          <div style={{ width: "100%", textAlign: "center", padding: "1rem" }}>
            Select channel
          </div>
        ) : (
          <>
            <ChatHistory />
            <ChatInput />
          </>
        )}
      </div>
      {activeChannel && <UsersList />}
    </>
  );
};
