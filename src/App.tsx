import "./App.css";
import { useAuthenticateAllNetworks } from "./features/authenticationSlice/authenticationSlice";
import { useIndexedDb } from "./features/indexedDb/indexedDb";
import { Main } from "./features/main/Main";
import {
  AuthenticatedContextProvider,
} from "./features/networking/AuthenticatedContext";
import { useNetworking } from "./features/networking/networking";
import { SocketContextProvider } from "./features/networking/SocketContext";
import { Sidebar } from "./features/sidebar/Sidebar";

function App() {
  const indexDbLoaded = useIndexedDb();
  const socket = useNetworking();

  useAuthenticateAllNetworks(indexDbLoaded, socket);
  

  return (
    <SocketContextProvider value={socket}>
      <AuthenticatedContextProvider value={[]}>
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
          {indexDbLoaded && (
            <>
              <Sidebar />

              <div style={{ display: "flex", flexGrow: 2 }}>
                <Main />
              </div>
            </>
          )}
        </div>
      </AuthenticatedContextProvider>
    </SocketContextProvider>
  );
}

export default App;
