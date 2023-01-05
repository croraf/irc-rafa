import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { changeActiveChannel, selectActiveChannel } from "../chat/chatSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const networksList = [
  {
    name: "LiberaChat",
    channels: [
      {
        name: "#ubuntu",
        description: "This is a channel for Ubuntu LTS support.",
      },
      { name: "#irc", description: "Ask anything about IRC." },
      {
        name: "#ubuntu-discussion",
        description: "Leave your common sense outside.",
      },
    ],
  },
  {
    name: "Freenode",
    channels: [
      {
        name: "#ubuntu",
        description: "This is a channel for Ubuntu LTS support.",
      },
      { name: "#freenode", description: "" },
      {
        name: "#ubuntu-discussion",
        description: "Leave your common sense outside.",
      },
    ],
  },
];

export const NetworksList = () => {
  const activeChannel = useAppSelector(selectActiveChannel);
  const dispatch = useAppDispatch();

  return (
    <aside
      style={{
        width: "100%",
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", textAlign: "center", marginBottom: "1rem" }}>
        <Button variant="contained" size="small">
          Add network
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          flexGrow: 2,
        }}
      >
        {networksList.map((network) => (
          <div key={network.name}>
            <div
              style={{
                opacity: 0.7,
              }}
            >
              {network.name}
            </div>
            <div style={{ marginLeft: "1rem" }}>
              {network.channels.map((channel) => (
                <Box
                  key={channel.name}
                  sx={[
                    { cursor: "pointer", opacity: 0.7 },
                    network.name === activeChannel?.networkName &&
                      channel.name === activeChannel.channelName && {
                        fontWeight: "bold",
                        opacity: 1,
                      },
                  ]}
                  onClick={() =>
                    dispatch(
                      changeActiveChannel({
                        networkName: network.name,
                        channelName: channel.name,
                      })
                    )
                  }
                >
                  {channel.name}
                </Box>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
