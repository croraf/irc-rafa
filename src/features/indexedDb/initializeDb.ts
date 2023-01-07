import * as JsStore from "jsstore";
import { AddNetwork, AddChannel } from "../networksSlice/networksSlice";

export const initializeDb = async (connection: JsStore.Connection) => {

  await connection.insert<AddNetwork>({
    into: "networks",
    values: [
      {
        networkName: "LiberaChat",
        username: "croraf",
        password: "pass1",
      },
      {
        networkName: "Freenode",
        username: "croraf",
        password: "pass99",
      },
    ],
  });

  await connection.insert<AddChannel>({
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
  });

  await connection.insert({
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
};
