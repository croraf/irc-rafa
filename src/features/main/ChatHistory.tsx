import { useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chat/chatSlice";
import { selectChatHistory } from "../chatHistory/chatHistorySlice";
import { Box } from "@mui/system";

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
    <Box
      sx={{
        flexGrow: 2,
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        rowGap: "0.5rem",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
          borderRadius: "3px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgb(35,35,35)",
          borderRadius: "3px",
        },
      }}
      id="chat-history"
    >
      {messages.map((message) => (
        <div key={message.timestamp} style={{ width: "100%" }}>
          <div style={{ opacity: 1 }}>
            <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
              {message.author}
            </span>
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
          <div style={{ opacity: 0.8, lineHeight: "1.4" }}>{message.text}</div>
        </div>
      ))}
    </Box>
  );
};
