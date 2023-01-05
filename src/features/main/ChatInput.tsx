import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chat/chatSlice";

export const ChatInput = () => {
  const activeChannel = useAppSelector(selectActiveChannel);

  return (
    <TextField
      style={{ height: "fit-content" }}
      placeholder={`Message ${activeChannel?.channelName}`}
    />
  );
};
