import { useEffect, useState } from "react";
import * as JsStore from "jsstore";
import {
  ActiveChannel,
  MessageDescription,
  reset as resetChatHistory,
} from "../chatHistorySlice/chatHistorySlice";
import workerInjector from "jsstore/dist/worker_injector";
import { useAppDispatch } from "../../app/hooks";
import {
  AddNetwork,
  AddChannel,
  addNetwork,
  addChannel,
  reset as resetNetworks,
} from "../networksSlice/networksSlice";

const networksTable: JsStore.ITable = {
  name: "networks",
  columns: {
    networkName: { primaryKey: true, dataType: "string" },
    username: { dataType: "string" },
    password: { dataType: "string" },
  },
};

const channelsTable: JsStore.ITable = {
  name: "channels",
  columns: {
    id: { primaryKey: true, dataType: "string" },
    channelName: { dataType: "string" },
    networkName: { dataType: "string" },
  },
};

type MessageDbEntry = {
  timestamp: number;
  author: string;
  text: string;
  networkName: string;
  channelName: string;
};

const messagesTable: JsStore.ITable = {
  name: "messages",
  columns: {
    timestamp: { primaryKey: true, dataType: "number" },
    author: { dataType: "string" },
    text: { dataType: "string" },
    networkName: { dataType: "string" },
    channelName: { dataType: "string" },
  },
};

const database: JsStore.IDataBase = {
  name: "irc-rafa",
  tables: [networksTable, channelsTable, messagesTable],
};

let connection: JsStore.Connection;

export const useIndexedDb = () => {
  const dispatch = useAppDispatch();
  const [connectedToIndexedDb, setConnectedToIndexedDb] = useState(false);

  useEffect(() => {
    connection = new JsStore.Connection();
    connection.addPlugin(workerInjector);

    connection.initDb(database).then(async () => {
      console.log("db opened");
      // initializeDb(connection);

      // to optimize into promise all
      const networks = await connection.select<AddNetwork>({
        from: "networks",
      });
      const channels = await connection.select<AddChannel>({
        from: "channels",
      });

      dispatch(resetChatHistory());
      dispatch(resetNetworks());
      networks.forEach((network) => {
        dispatch(addNetwork(network));
      });
      channels.forEach((channel) => {
        dispatch(addChannel(channel));
      });

      setConnectedToIndexedDb(true);
    });
  }, [dispatch]);

  return connectedToIndexedDb;
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

export const getMessagesForChannel = async (activeChannel: ActiveChannel) => {
  // await new Promise((resolve) => setTimeout(resolve, 1000));
  return await connection.select<MessageDbEntry>({
    from: "messages",
    where: {
      networkName: activeChannel.networkName,
      channelName: activeChannel.channelName,
    },
    order: { by: "timestamp", type: "asc" },
  });
};

export const getConnection = () => {
  return connection;
};
