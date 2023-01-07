import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const AuthenticatedContext = createContext<string[]>([]);

export const AuthenticatedContextProvider = AuthenticatedContext.Provider;

export const useAuthentication = () => {
  return useContext(AuthenticatedContext);
};

export const useAuthenticationStatus = (socket: Socket | undefined) => {
  const [authenticationStatus, setAuthenticationStatus] = useState([]);

  useEffect(() => {
    socket?.emit("authenticate");
  }, [socket]);

  return authenticationStatus;
};
