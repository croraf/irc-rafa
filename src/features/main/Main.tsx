import { UsersList } from "../usersList/UsersList";
import { Header } from "./Header";
import { MainChatPanel } from "./MainChatPanel";

export const Main = () => {

  return (
    <main
      style={{
        flexGrow: 2,
        display: "flex",
        flexDirection: "column",
        borderLeft: "1px solid black",
        borderRight: "1px solid black",
      }}
    >
      <div
        style={{
          borderBottom: "1px solid black",
          height: "50px",
          fontSize: "1.2rem",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
        }}
      >
        <Header />
      </div>
      <div style={{ display: "flex", flexGrow: 2 }}>
        <div
          style={{
            flexGrow: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgb(64,67,83)",
          }}
        >
          <MainChatPanel />
        </div>
        <UsersList />
      </div>
    </main>
  );
};
