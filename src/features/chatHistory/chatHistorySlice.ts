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

export interface MessageEntry {
  networkName: string;
  channelName: string;
  message: MessageDescription;
}

export interface AddChannel {
  id: string;
  networkName: string;
  channelName: string;
}

const initialState: Record<string, NetworkDescription> = {};

export const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    addChannel: (state, action: PayloadAction<AddChannel>) => {
      if (state[action.payload.networkName] === undefined) {
        state[action.payload.networkName] = {
          name: action.payload.networkName,
          channels: {},
        };
      }
      state[action.payload.networkName].channels[action.payload.channelName] = {
        name: action.payload.channelName,
        description: "",
        messages: [],
      };
    },
    addMessage: (state, action: PayloadAction<MessageEntry>) => {
      state[action.payload.networkName].channels[
        action.payload.channelName
      ].messages.push(action.payload.message);
    },
    reset: () => initialState,
  },
});

export const { addMessage, addChannel, reset } = chatHistorySlice.actions;

export const selectChatHistory = (state: RootState) => state.chatHistory;

export default chatHistorySlice.reducer;
