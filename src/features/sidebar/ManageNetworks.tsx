import Button from "@mui/material/Button";
import { useState } from "react";
import { NetworksList } from "./NetworksList";
import { NetworkDescription } from "../../types";
import { ManageNetworkModal } from "./ManageNetworkModal";

const networksList: NetworkDescription[] = [
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

export const ManageNetworks = () => {
  const [manageNetworkData, setManageNetworkData] = useState<{} | undefined>();

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
        <NetworksList networksList={networksList} />
      </div>
    </aside>
  );
};
