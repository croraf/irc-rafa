import "./App.css";
import { Main } from "./features/main/Main";
import { Sidebar } from "./features/sidebar/Sidebar";

function App() {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        height: "100vh",
        width: "100vw",
        boxSizing: "border-box",
        background: "rgb(54,57, 63)",
        color: "white",
      }}
    >
      <Sidebar />

      <div style={{ display: "flex", flexGrow: 2 }}>
        <Main />
      </div>
    </div>
  );
}

export default App;
