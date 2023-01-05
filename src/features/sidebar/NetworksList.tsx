import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { NetworkDescription } from "../../types";
import { selectActiveChannel, changeActiveChannel } from "../chat/chatSlice";
import { Box } from "@mui/system";

export const NetworksList = ({
  networksList,
}: {
  networksList: NetworkDescription[];
}) => {
  const activeChannel = useAppSelector(selectActiveChannel);
  const dispatch = useAppDispatch();

  return (
    <>
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
    </>
  );
};
