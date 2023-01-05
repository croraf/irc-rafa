import { useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chat/chatSlice";
import { UsersList } from "../usersList/UsersList";
import { ChatInput } from "./ChatInput";
import { Header } from "./Header";

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
      <div
        style={{
          borderBottom: "1px solid black",
          height: "50px",
          fontSize: "1.2rem",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
        }}
      >
        <Header activeChannel={activeChannel?.channelName} />
      </div>
      <div style={{ display: "flex", flexGrow: 2 }}>
        <div
          style={{
            flexGrow: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(64,67,83)",
          }}
        >
          {activeChannel === null ? (
            <div
              style={{ width: "100%", textAlign: "center", padding: "1rem" }}
            >
              Select channel
            </div>
          ) : (
            <>
              <div style={{ flexGrow: 2, padding: "0.5rem" }}>Chat history</div>
              <ChatInput />
            </>
          )}
        </div>
        <UsersList />
      </div>
    </main>
  );
};
