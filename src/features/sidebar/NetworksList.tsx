import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectActiveChannel, changeActiveChannel } from "../chat/chatSlice";
import { Box } from "@mui/system";
import { NetworkDescription } from "../chatHistory/chatHistorySlice";

export const NetworksList = ({
  networks,
}: {
  networks: Record<string, NetworkDescription>;
}) => {
  const activeChannel = useAppSelector(selectActiveChannel);
  const dispatch = useAppDispatch();

  return (
    <>
      {Object.entries(networks).map(([networkName, network]) => (
        <div key={networkName}>
          <div
            style={{
              opacity: 0.7,
            }}
          >
            {networkName}
          </div>
          <div style={{ marginLeft: "1rem" }}>
            {Object.entries(network.channels).map(([channelName, channel]) => (
              <Box
                key={channelName}
                sx={[
                  { cursor: "pointer", opacity: 0.7 },
                  networkName === activeChannel?.networkName &&
                    channelName === activeChannel.channelName && {
                      fontWeight: "bold",
                      opacity: 1,
                    },
                ]}
                onClick={() =>
                  dispatch(
                    changeActiveChannel({
                      networkName: networkName,
                      channelName: channelName,
                    })
                  )
                }
              >
                {channelName}
              </Box>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};
