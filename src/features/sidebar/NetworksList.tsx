import { NetworkDescription } from "../networksSlice/networksSlice";

import { NetworkItem } from "./NetworkItem";

export const NetworksList = ({
  networks,
  onEditClick,
}: {
  networks: Record<string, NetworkDescription>;
  onEditClick: (networkName: string) => void;
}) => {
  return (
    <>
      {Object.values(networks).map((network) => (
        <NetworkItem
          key={network.networkName}
          data={network}
          onEditClick={onEditClick}
        />
      ))}
    </>
  );
};
