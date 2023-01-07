import { useAppSelector } from "../../app/hooks";
import { selectActiveChannel } from "../chatHistorySlice/chatHistorySlice";

export const Header = () => {
  const activeChannel = useAppSelector(selectActiveChannel);

  if (activeChannel === undefined) {
    return null;
  }

  return (
    <>
      <div>{activeChannel.channelName}</div>
      <div
        style={{
          height: "80%",
          width: "1px",
          background: "gray",
          margin: "0rem 1rem",
        }}
      />
      <div style={{ fontSize: "0.9rem", opacity: "0.7" }}>
        This is a channel for Ubuntu LTS support.
      </div>
    </>
  );
};
