import * as JsStore from "jsstore";
import {
  ActiveChannel,
  MessageDescription,
} from "../chatHistorySlice/chatHistorySlice";
import { AddNetwork } from "../networksSlice/networksSlice";

export type MessageDbEntry = {
  timestamp: number;
  author: string;
  text: string;
  networkName: string;
  channelName: string;
};

let connection: JsStore.Connection;

export const getConnection = () => {
  return connection;
};
export const setConnection = (connectionParam: JsStore.Connection) => {
  connection = connectionParam;
};

export const insertRow = (msg: MessageDescription) => {
  connection
    .insert<MessageDbEntry>({
      into: "messages",
      values: [msg],
    })
    .then(() => {
      console.log("db insertion completed");
    });
};

export const upsertNetworkRow = (msg: AddNetwork) => {
  connection
    .insert<AddNetwork>({
      into: "networks",
      upsert: true,
      values: [msg],
    })
    .then(() => {
      console.log("db insertion completed");
    });
};

export const getMessagesForChannel = async (activeChannel: ActiveChannel) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("get messages", activeChannel);
  return await connection.select<MessageDbEntry>({
    from: "messages",
    where: {
      networkName: activeChannel.networkName,
      channelName: activeChannel.channelName,
    },
    order: { by: "timestamp", type: "asc" },
  });
};
