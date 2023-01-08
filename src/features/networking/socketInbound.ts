import { io } from "socket.io-client";
import { store } from "../../app/store";
import {
  AuthDescription,
  setAuthenticationStatus,
} from "../authenticationSlice/authenticationSlice";
import {
  MessageDescription,
  addMessage,
} from "../chatHistorySlice/chatHistorySlice";
import { setSocketStatus } from "../connectionsStatusesSlice/connectionsStatusesSlice";
import { insertRow } from "../indexedDb/indexedDb";
import { addUnreadMessages } from "../unreadMessagesSlice/unreadMessagesSlice";
import { setSocket } from "./socket";

export const setupSocket = () => {
  const socketApi = io("http://localhost:4000");

  socketApi.on("chat", (msg: MessageDescription) => {
    console.log("socket message - type chat", msg);
    insertRow(msg);
    store.dispatch(addMessage(msg));
    store.dispatch(
      addUnreadMessages({
        networkName: msg.networkName,
        channelName: msg.channelName,
        numberOfUnread: 1,
      })
    );
  });

  socketApi.on("auth", (msg: AuthDescription) => {
    console.log("socket message - type auth", msg);
    store.dispatch(setAuthenticationStatus(msg));
  });

  socketApi.on("connect", () => {
    setSocket(socketApi);
    console.log("socket.io connected");
    store.dispatch(setSocketStatus("connected"));
  });
};
