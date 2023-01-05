import Button from "@mui/material/Button";
import { useState } from "react";
import { NetworksList } from "./NetworksList";
import { ManageNetworkModal } from "./ManageNetworkModal";
import { useAppSelector } from "../../app/hooks";
import { selectChatHistory } from "../chatHistory/chatHistorySlice";

export const ManageNetworks = () => {
  const [manageNetworkData, setManageNetworkData] = useState<{} | undefined>();
  const networks = useAppSelector(selectChatHistory);

  return (
    <aside
      style={{
        width: "100%",
        padding: "1rem 0.5rem",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", textAlign: "center", marginBottom: "1rem" }}>
        <ManageNetworkModal
          data={manageNetworkData}
          handleClose={() => setManageNetworkData(undefined)}
        />
        <Button
          variant="contained"
          size="small"
          style={{ width: "100%" }}
          onClick={() => setManageNetworkData({})}
        >
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
        <NetworksList networks={networks} />
      </div>
    </aside>
  );
};
