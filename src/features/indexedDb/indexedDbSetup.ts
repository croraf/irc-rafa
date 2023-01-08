import * as JsStore from "jsstore";
import workerInjector from "jsstore/dist/worker_injector";
import {
  AddNetwork,
  AddChannel,
  addChannel,
} from "../networksSlice/networksSlice";
import { store } from "../../app/store";
import { setIndexedDbStatus } from "../connectionsStatusesSlice/connectionsStatusesSlice";
import { setConnection } from "./indexedDb";
import { addModifyNetwork } from "../commonActions/commonActions";

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

export const setupIndexedDb = () => {
  const connection = new JsStore.Connection();
  connection.addPlugin(workerInjector);

  connection.initDb(database).then(async () => {
    // initializeDb(connection);

    // to optimize into promise all
    const networks = await connection.select<AddNetwork>({
      from: "networks",
    });
    const channels = await connection.select<AddChannel>({
      from: "channels",
    });

    networks.forEach((network) => {
      store.dispatch(addModifyNetwork({ ...network, channels: {} }));
    });
    channels.forEach((channel) => {
      store.dispatch(addChannel(channel));
    });

    console.log("IndexedDb initialized");
    setConnection(connection);
    store.dispatch(setIndexedDbStatus("connected"));
  });
};
