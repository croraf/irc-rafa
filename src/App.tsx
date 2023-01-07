import "./App.css";
import { useIndexedDb } from "./features/indexedDb/indexedDb";
import { Main } from "./features/main/Main";
import { useNetworking } from "./features/networking/networking";
import { Sidebar } from "./features/sidebar/Sidebar";

function App() {
  const connectedToDb = useIndexedDb();
  useNetworking();

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
      {connectedToDb && (
        <>
          <Sidebar />

          <div style={{ display: "flex", flexGrow: 2 }}>
            <Main />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
