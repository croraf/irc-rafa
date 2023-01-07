import { useEffect, useState } from "react";
import * as JsStore from "jsstore";
import {
  AddChannel,
  addChannel,
  addMessage,
  MessageEntry,
  reset,
} from "../chatHistory/chatHistorySlice";
import workerInjector from "jsstore/dist/worker_injector";
import { useAppDispatch } from "../../app/hooks";

const channelsTable: JsStore.ITable = {
  name: "channels",
  columns: {
    id: { primaryKey: true, dataType: "string" },
    networkName: { dataType: "string" },
    channelName: { dataType: "string" },
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
  tables: [channelsTable, messagesTable],
};

let connection: JsStore.Connection;

export const useIndexedDb = () => {
  const dispatch = useAppDispatch();
  const [connected, setConnected] = useState(true);
  useEffect(() => {
    connection = new JsStore.Connection();
    connection.addPlugin(workerInjector);

    connection.initDb(database).then(() => {
      console.log("db opened");
      setConnected(true);
      // initializeDb();
      connection.select<AddChannel>({ from: "channels" }).then((channels) => {
        connection
          .select<MessageDbEntry>({
            from: "messages",
            order: { by: "timestamp", type: "asc" },
          })
          .then((messages) => {
            dispatch(reset());
            channels.forEach((channel) => {
              dispatch(addChannel(channel));
            });

            messages.forEach((message) => {
              dispatch(
                addMessage({
                  networkName: message.networkName,
                  channelName: message.channelName,
                  message: {
                    author: message.author,
                    text: message.text,
                    timestamp: message.timestamp,
                  },
                })
              );
            });
          });
      });
    });
  }, [dispatch]);

  return connected;
};

export const insertRow = (msg: MessageEntry) => {
  connection
    .insert<MessageDbEntry>({
      into: "messages",
      values: [
        {
          ...msg.message,
          networkName: msg.networkName,
          channelName: msg.channelName,
        },
      ],
    })
    .then(() => {
      console.log("db insertion completed");
    });
};

export const initializeDb = (msg?: MessageEntry) => {
  connection
    .insert<AddChannel>({
      into: "channels",
      values: [
        {
          id: "LiberaChat_#ubuntu",
          networkName: "LiberaChat",
          channelName: "#ubuntu",
        },
        {
          id: "LiberaChat_#irc",
          networkName: "LiberaChat",
          channelName: "#irc",
        },
        {
          id: "LiberaChat_#ubuntu-discussion",
          networkName: "LiberaChat",
          channelName: "#ubuntu-discussion",
        },
        {
          id: "Freenode_#ubuntu",
          networkName: "Freenode",
          channelName: "#ubuntu",
        },
        {
          id: "Freenode_#freenode",
          networkName: "Freenode",
          channelName: "#freenode",
        },
        {
          id: "Freenode_#ubuntu-discussion",
          networkName: "Freenode",
          channelName: "#ubuntu-discussion",
        },
      ],
    })
    .then(() => {
      console.log("insertion completed");
      connection.insert({
        into: "messages",
        values: [
          {
            author: "croraf",
            text: "Hi how are you.",
            timestamp: 1672928940924,
            networkName: "LiberaChat",
            channelName: "#irc",
          },
          {
            author: "mark1",
            text: "Hi how are you.",
            timestamp: 1672928950924,
            networkName: "LiberaChat",
            channelName: "#irc",
          },
          {
            author: "croraf",
            text: "Hi how are you.",
            timestamp: 1672928950925,
            networkName: "LiberaChat",
            channelName: "#irc",
          },
          {
            author: "jasmine",
            text: "Hi how are you.",
            timestamp: 1672928970924,
            networkName: "LiberaChat",
            channelName: "#irc",
          },
        ],
      });
    });
};
