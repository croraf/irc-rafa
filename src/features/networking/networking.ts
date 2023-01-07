import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch } from "../../app/hooks";
import { MessageEntry, addMessage } from "../chatHistory/chatHistorySlice";
import { insertRow } from "../indexedDb/indexedDb";

let socket: Socket;

export const useNetworking = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    socket = io("http://localhost:4000");

    socket.onAny((msg: MessageEntry) => {
      console.log('socket message');
      insertRow(msg);
      dispatch(addMessage(msg));
    });

    return () => {
      console.log("disconnect");
      socket.disconnect();
    };
  }, [dispatch]);
};

export const send = (data: MessageEntry) => {
  socket.send(data);
};
