import "./App.css";
import { Main } from "./features/main/Main";
import { NetworksList } from "./features/networksList/NetworksList";
import { UsersList } from "./features/usersList/UsersList";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        height: "100vh",
        width: "100vw",
        boxSizing: "border-box",
      }}
    >
      <header
        style={{ height: "fit-content", borderBottom: "1px solid black" }}
        className="App-header"
      >
        <span>IRC Rafa</span>
      </header>
      <div style={{ display: "flex", flexGrow: 2 }}>
        <NetworksList />
        <Main />
        <UsersList />
      </div>
    </div>
  );
}

export default App;
