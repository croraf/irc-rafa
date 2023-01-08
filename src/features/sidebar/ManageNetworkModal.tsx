import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import { NetworkDescription } from "../networksSlice/networksSlice";
import { ChangeEvent, useState } from "react";

export const ManageNetworkModal = ({
  data,
  handleClose,
  handleConfirm,
}: {
  data: NetworkDescription | {} | undefined;
  handleClose: () => void;
  handleConfirm: (data: NetworkDescription) => void;
}) => {
  const [state, setState] = useState<NetworkDescription>({
    networkName: "",
    url: "",
    port: "",
    username: "",
    password: "",
    channels: {},
    ...data,
  });

  const onChange =
    (field: Exclude<keyof typeof state, "channels">) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setState({
        ...state,
        [field]: e.target.value,
      });
    };

  return (
    <Dialog onClose={handleClose} open={data !== undefined}>
      <DialogTitle>
        {data && "networkName" in data ? "Modify network" : "Add new network"}
      </DialogTitle>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          rowGap: "1rem",
          width: "400px",
        }}
      >
        <TextField
          label="Network URL"
          value={state.url}
          onChange={onChange("url")}
          disabled={data && "networkName" in data}
        />
        <TextField
          label="Port"
          value={state.port}
          onChange={onChange("port")}
          disabled={data && "networkName" in data}
        />
        <TextField
          label="Name"
          value={state.networkName}
          onChange={onChange("networkName")}
        />
        <TextField
          label="Username"
          value={state.username}
          onChange={onChange("username")}
        />
        <TextField
          label="Password"
          value={state.password}
          onChange={onChange("password")}
        />

        <div
          style={{
            display: "flex",
            columnGap: "1rem",
            justifyContent: "center",
          }}
        >
          <Fab
            size="small"
            aria-label="add"
            color="primary"
            onClick={() => handleConfirm(state)}
          >
            <Check />
          </Fab>
          <Fab
            size="small"
            aria-label="cancel"
            color="error"
            onClick={handleClose}
          >
            <Clear />
          </Fab>
        </div>
      </form>
    </Dialog>
  );
};
