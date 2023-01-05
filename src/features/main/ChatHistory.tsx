import { useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chat/chatSlice";
import { selectChatHistory } from "../chatHistory/chatHistorySlice";

/* const messages = [
  { author: "croraf", text: "Hi how are you.", timestamp: "Today 11:00" },
  { author: "mark1", text: "Hi how are you.", timestamp: "Today 11:03" },
  { author: "croraf", text: "Hi how are you.", timestamp: "Today 11:03" },
  { author: "jasmine", text: "Hi how are you.", timestamp: "Today 11:11" },
]; */

export const ChatHistory = () => {
  const chatHistory = useAppSelector(selectChatHistory);
  const activeChannel = useAppSelector(selectActiveChannel);

  const messages =
    chatHistory[activeChannel!.networkName].channels[activeChannel!.channelName]
      .messages;

  return (
    <div
      style={{
        flexGrow: 2,
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
        overflow: "auto",
      }}
    >
      {messages.map((message) => (
        <div key={message.timestamp} style={{ width: "100%" }}>
          <div style={{ opacity: 1 }}>
            <span>{message.author}</span>
            <span
              style={{
                opacity: "0.7",
                fontSize: "0.8rem",
                marginLeft: "1rem",
              }}
            >
              {new Date(message.timestamp).toLocaleString("hr")}
            </span>
          </div>
          <div style={{ opacity: 0.8 }}>{message.text}</div>
        </div>
      ))}
    </div>
  );
};
