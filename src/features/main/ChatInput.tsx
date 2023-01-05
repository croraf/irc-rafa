import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chat/chatSlice";
import { updateChatHistory } from "../chatHistory/chatHistorySlice";

export const ChatInput = () => {
  const activeChannel = useAppSelector(selectActiveChannel);
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      dispatch(
        updateChatHistory({
          ...activeChannel!,
          message: {
            author: "croraf",
            text: value,
            timestamp: Date.now(),
          },
        })
      );
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
