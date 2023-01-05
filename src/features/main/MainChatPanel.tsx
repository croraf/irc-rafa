import { useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chat/chatSlice";
import { UsersList } from "../usersList/UsersList";
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
            <div style={{ flexGrow: 2, padding: "1rem" }}>Chat history</div>
            <ChatInput />
          </>
        )}
      </div>
      {activeChannel && <UsersList />}
    </>
  );
};
