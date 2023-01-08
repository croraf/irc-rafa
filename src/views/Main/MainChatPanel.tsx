import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../../features/chatHistorySlice/chatHistorySlice";
import {
  clearUnreadMessages,
  selectUnreadMessages,
} from "../../features/unreadMessagesSlice/unreadMessagesSlice";
import { UsersList } from "../UsersList/UsersList";
import { ChatHistory } from "./ChatHistory";
import { ChatInput } from "./ChatInput";

export const MainChatPanel = () => {
  const activeChannel = useAppSelector(selectActiveChannel);
  const dispatch = useAppDispatch();
  const unreadMessages = useAppSelector(selectUnreadMessages);

  useEffect(() => {
    if (activeChannel !== undefined) {
      dispatch(clearUnreadMessages(activeChannel));
    }
  }, [dispatch, activeChannel, unreadMessages]);

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
        {activeChannel === undefined ? (
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
