import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, useLayoutEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
  MessageDescription,
  selectActiveChannel,
} from "../chatHistorySlice/chatHistorySlice";
import { useSocket } from "../networking/SocketContext";

export const ChatInput = () => {
  const activeChannel = useAppSelector(selectActiveChannel);
  const [value, setValue] = useState("");
  const socket = useSocket();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      const message: MessageDescription = {
        ...activeChannel!,
        author: "croraf",
        text: value,
        timestamp: Date.now(),
      };
      socket?.emit("chatMessage", message);
      setValue("");
    }
  };

  useLayoutEffect(() => {
    if (value === "") {
      const chatHistory = document.getElementById("chat-history")!;
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }, [value]);

  return (
    <TextField
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={{
        padding: "0.5rem 1rem",
        boxSizing: "border-box",
      }}
      placeholder={`Message ${activeChannel?.channelName}`}
    />
  );
};
