import {
  changeActiveChannel,
  selectActiveChannel,
} from "../chatHistorySlice/chatHistorySlice";
import { NetworkDescription, useStoreNetworkModification } from "../networksSlice/networksSlice";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectAuthentication,
  useAuthenticateNetwork,
} from "../authenticationSlice/authenticationSlice";
import { selectUnreadMessages } from "../unreadMessagesSlice/unreadMessagesSlice";

export const NetworkItem = ({
  data,
  onEditClick,
}: {
  data: NetworkDescription;
  onEditClick: (networkName: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const authenticationStatus = useAppSelector(selectAuthentication);
  const isAuthenticated =
    authenticationStatus[data.networkName] === "authenticated";
  const unreadMessages = useAppSelector(selectUnreadMessages);
  const activeChannel = useAppSelector(selectActiveChannel);

  useAuthenticateNetwork(data);
  useStoreNetworkModification(data);

  return (
    <div key={data.networkName}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: 0.7,
          color: isAuthenticated ? undefined : "red",
        }}
      >
        <div>{data.networkName}</div>
        <IconButton size="small" onClick={() => onEditClick(data.networkName)}>
          <EditIcon fontSize="small" />
        </IconButton>
      </div>
      <div style={{ marginLeft: "1rem" }}>
        {Object.values(data.channels).map((channel) => (
          <Box
            key={channel.name}
            sx={[
              { cursor: "pointer", opacity: 0.7 },
              data.networkName === activeChannel?.networkName &&
                channel.name === activeChannel?.channelName && {
                  fontWeight: "500",
                  fontStyle: "italic",
                  opacity: 1,
                },
              unreadMessages[data.networkName]?.[channel.name] > 0 && {
                color: "#4a83e7",
              },
            ]}
            onClick={() =>
              dispatch(
                changeActiveChannel({
                  networkName: data.networkName,
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
  );
};
