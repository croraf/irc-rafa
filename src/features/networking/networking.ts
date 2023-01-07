import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch } from "../../app/hooks";
import { MessageDescription, addMessage } from "../chatHistorySlice/chatHistorySlice";
import { insertRow } from "../indexedDb/indexedDb";

export const useNetworking = () => {
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    const socketApi = io("http://localhost:4000");

    socketApi.on("chatMessage", (msg: MessageDescription) => {
      console.log("socket message", msg);
      insertRow(msg);
      dispatch(addMessage(msg));
    });

    socketApi.on("connect", () => {
      setSocket(socketApi);
    });

    return () => {
      console.log("disconnect");
      socketApi?.disconnect();
      setSocket(undefined);
    };
  }, [dispatch]);

  return socket;
};
