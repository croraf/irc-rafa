import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | undefined>(undefined);

export const SocketContextProvider = SocketContext.Provider;

export const useSocket = () => {
  return useContext(SocketContext);
};
