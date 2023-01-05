import TextField from "@mui/material/TextField";
import { useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chat/chatSlice";

export const ChatInput = () => {
  const activeChannel = useAppSelector(selectActiveChannel);

  return (
    <TextField
      style={{ height: "fit-content", margin: "0.5rem 1rem" }}
      placeholder={`Message ${activeChannel?.channelName}`}
    />
  );
};
