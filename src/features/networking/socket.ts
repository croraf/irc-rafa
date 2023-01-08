import { Socket } from "socket.io-client";


let socket: Socket | undefined;
export const getSocket = () => {
  if (!socket) {
    throw Error("socket not created");
  }
  return socket;
};
export const setSocket = (socketParam: Socket) => {
  socket = socketParam;
};
