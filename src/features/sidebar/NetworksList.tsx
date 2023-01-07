import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Box } from "@mui/system";
import { NetworkDescription } from "../networksSlice/networksSlice";
import {
  changeActiveChannel,
  selectActiveChannel,
} from "../chatHistorySlice/chatHistorySlice";
import { selectAuthentication } from "../authenticationSlice/authenticationSlice";
import { selectUnreadMessages } from "../unreadMessagesSlice/unreadMessagesSlice";

export const NetworksList = ({
  networks,
}: {
  networks: Record<string, NetworkDescription>;
}) => {
  const activeChannel = useAppSelector(selectActiveChannel);
  const dispatch = useAppDispatch();
  const authenticationStatus = useAppSelector(selectAuthentication);
  const unreadMessages = useAppSelector(selectUnreadMessages);

  return (
    <>
      {Object.entries(networks).map(([networkName, network]) => {
        const isAuthenticated =
          authenticationStatus[networkName] === "authenticated";
        return (
          <div key={networkName}>
            <div
              style={{
                opacity: 0.7,
                color: isAuthenticated ? undefined : "red",
              }}
            >
              {networkName}
            </div>
            <div style={{ marginLeft: "1rem" }}>
              {Object.entries(network.channels).map(
                ([channelName, channel]) => (
                  <Box
                    key={channelName}
                    sx={[
                      { cursor: "pointer", opacity: 0.7 },
                      networkName === activeChannel?.networkName &&
                        channelName === activeChannel.channelName && {
                          fontWeight: "500",
                          fontStyle: "italic",
                          opacity: 1,
                        },
                      unreadMessages[networkName]?.[channelName] > 0 && {
                        color: "#4a83e7",
                      },
                    ]}
                    onClick={() =>
                      dispatch(
                        changeActiveChannel({
                          networkName,
                          channelName,
                        })
                      )
                    }
                  >
                    {channelName}
                  </Box>
                )
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};
