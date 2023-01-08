import "./App.css";
import { useAppSelector } from "./app/hooks";
import {
  selectIndexedDbStatus,
} from "./features/connectionsStatusesSlice/connectionsStatusesSlice";
import { Main } from "./views/Main/Main";
import { Sidebar } from "./features/sidebar/Sidebar";

function App() {
  const indexDbStatus = useAppSelector(selectIndexedDbStatus);

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
      {indexDbStatus === "connected" && (
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
