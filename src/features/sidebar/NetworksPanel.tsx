import Button from "@mui/material/Button";
import { useState } from "react";
import { NetworksList } from "./NetworksList";
import { ManageNetworkModal } from "./ManageNetworkModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  NetworkDescription,
  selectNetworks,
} from "../networksSlice/networksSlice";
import { addModifyNetwork } from "../commonActions/commonActions";

export const NetworksPanel = () => {
  const [manageNetworkData, setManageNetworkData] = useState<
    NetworkDescription | {} | undefined
  >();
  const networks = useAppSelector(selectNetworks);
  const dispatch = useAppDispatch();

  const onEditNetworkClick = (networkName: string) => {
    const networkData = networks[networkName];
    setManageNetworkData(networkData);
  };

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
        {manageNetworkData !== undefined && (
          <ManageNetworkModal
            data={manageNetworkData}
            handleClose={() => setManageNetworkData(undefined)}
            handleConfirm={(data: NetworkDescription) => {
              dispatch(addModifyNetwork(data));
              setManageNetworkData(undefined);
            }}
          />
        )}
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
        <NetworksList networks={networks} onEditClick={onEditNetworkClick} />
      </div>
    </aside>
  );
};
