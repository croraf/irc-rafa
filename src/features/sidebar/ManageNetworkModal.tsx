import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import Add from "@mui/icons-material/Add";
import Clear from "@mui/icons-material/Clear";

export const ManageNetworkModal = ({
  data,
  handleClose,
}: {
  data: {} | undefined;
  handleClose: () => void;
}) => {
  return (
    <Dialog onClose={handleClose} open={data !== undefined}>
      <DialogTitle>Add new network</DialogTitle>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          rowGap: "1rem",
          width: "400px",
        }}
      >
        <TextField label="Network URL" />
        <TextField label="Port" />
        <TextField label="Username" />
        <TextField label="Password" />

        <div
          style={{
            display: "flex",
            columnGap: "1rem",
            justifyContent: "center",
          }}
        >
          <Fab size="small" aria-label="add" color="primary">
            <Add />
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
