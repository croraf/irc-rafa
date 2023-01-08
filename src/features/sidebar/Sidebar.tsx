import { NetworksPanel } from "./NetworksPanel";

export const Sidebar = () => {
  return (
    <div style={{ width: "150px" }}>
      <div
        style={{
          height: "50px",
          borderBottom: "1px solid black",
          fontSize: "1.5rem",
          lineHeight: "50px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        IRC Rafa
      </div>
      <NetworksPanel />
    </div>
  );
};
