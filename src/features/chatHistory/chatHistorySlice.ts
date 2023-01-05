import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface MessageDescription {
  author: string;
  text: string;
  timestamp: number;
}

interface ChannelDescription {
  name: string;
  description: string;
  messages: MessageDescription[];
}

export interface NetworkDescription {
  name: string;
  channels: Record<string, ChannelDescription>;
}

export interface ChatHistoryUpdate {
  networkName: string;
  channelName: string;
  message: MessageDescription;
}

const initialState: Record<string, NetworkDescription> = {
  "LiberaChat": {
    name: "LiberaChat",
    channels: {
      "#ubuntu": {
        name: "#ubuntu",
        description: "This is a channel for Ubuntu LTS support.",
        messages: [],
      },
      "#irc": {
        name: "#irc",
        description: "Ask anything about IRC.",
        messages: [
          {
            author: "croraf",
            text: "Hi how are you.",
            timestamp: 1672928940924,
          },
          {
            author: "mark1",
            text: "Hi how are you.",
            timestamp: 1672928950924,
          },
          {
            author: "croraf",
            text: "Hi how are you.",
            timestamp: 1672928950925,
          },
          {
            author: "jasmine",
            text: "Hi how are you.",
            timestamp: 1672928970924,
          },
        ],
      },
      "#ubuntu-discussion": {
        name: "#ubuntu-discussion",
        description: "Leave your common sense outside.",
        messages: [],
      },
    },
  },
  "Freenode": {
    name: "Freenode",
    channels: {
      "#ubuntu": {
        name: "#ubuntu",
        description: "This is a channel for Ubuntu LTS support.",
        messages: [],
      },
      "#freenode": { name: "#freenode", description: "", messages: [] },
      "#ubuntu-discussion": {
        name: "#ubuntu-discussion",
        description: "Leave your common sense outside.",
        messages: [],
      },
    },
  },
};

export const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    updateChatHistory: (state, action: PayloadAction<ChatHistoryUpdate>) => {
      state[action.payload.networkName].channels[
        action.payload.channelName
      ].messages.push(action.payload.message);
    },
  },
});

export const { updateChatHistory } = chatHistorySlice.actions;

export const selectChatHistory = (state: RootState) => state.chatHistory;

export default chatHistorySlice.reducer;
