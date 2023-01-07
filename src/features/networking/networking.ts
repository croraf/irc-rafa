import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch } from "../../app/hooks";
import {
  AuthDescription,
  setAuthenticationStatus,
} from "../authenticationSlice/authenticationSlice";
import {
  MessageDescription,
  addMessage,
} from "../chatHistorySlice/chatHistorySlice";
import { insertRow } from "../indexedDb/indexedDb";
import { addUnreadMessages } from "../unreadMessagesSlice/unreadMessagesSlice";

export const useNetworking = () => {
  const dispatch = useAppDispatch();
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    const socketApi = io("http://localhost:4000");

    socketApi.on("chat", (msg: MessageDescription) => {
      console.log("socket message - type chat", msg);
      insertRow(msg);
      dispatch(addMessage(msg));
      dispatch(
        addUnreadMessages({
          networkName: msg.networkName,
          channelName: msg.channelName,
          numberOfUnread: 1,
        })
      );
    });

    socketApi.on("auth", (msg: AuthDescription) => {
      console.log("socket message - type auth", msg);
      dispatch(setAuthenticationStatus(msg));
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
