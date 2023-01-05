import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { changeActiveChannel, selectActiveChannel } from "../chat/chatSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const networksList = [
  { name: "LiberaChat", channels: ["#ubuntu", "#irc", "#ubuntu-discussion"] },
  {
    name: "Freenode",
    channels: ["#ubuntu", "#freenode", "#ubuntu-discussion"],
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
            <div>{network.name}</div>
            <div style={{ marginLeft: "1rem" }}>
              {network.channels.map((channel) => (
                <Box
                  key={channel}
                  sx={[
                    { cursor: "pointer" },
                    network.name === activeChannel?.networkName &&
                      channel === activeChannel.channelName && {
                        fontWeight: "bold",
                      },
                  ]}
                  onClick={() =>
                    dispatch(
                      changeActiveChannel({
                        networkName: network.name,
                        channelName: channel,
                      })
                    )
                  }
                >
                  {channel}
                </Box>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
