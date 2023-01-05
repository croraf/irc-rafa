import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, useState } from "react";
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

  return (
    <TextField
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={{ height: "fit-content", margin: "0.5rem 1rem" }}
      placeholder={`Message ${activeChannel?.channelName}`}
    />
  );
};
