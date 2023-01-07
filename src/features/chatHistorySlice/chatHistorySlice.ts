import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getMessagesForChannel } from "../indexedDb/indexedDb";

export interface MessageDescription {
  author: string;
  text: string;
  timestamp: number;
  networkName: string;
  channelName: string;
}

export interface ActiveChannel {
  networkName: string;
  channelName: string;
}

const initialState: {
  activeChannel:
    | {
        networkName: string;
        channelName: string;
      }
    | undefined;
  messages: MessageDescription[];
} = {
  activeChannel: undefined,
  messages: [],
};

export const changeActiveChannel = createAsyncThunk(
  "chatHistory/changeActiveChannel",
  async (newActiveChannel: ActiveChannel) => {
    const response = await getMessagesForChannel(newActiveChannel);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const chatHistorySlice = createSlice({
  name: "chatHistory",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageDescription>) => {
      if (
        state.activeChannel?.networkName === action.payload.networkName &&
        state.activeChannel.channelName === action.payload.channelName
      ) {
        state.messages.push(action.payload);
      }
    },
    changeActiveChannel: (state, action: PayloadAction<ActiveChannel>) => {
      state.activeChannel = action.payload;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeActiveChannel.pending, (state, action) => {
        state.activeChannel = action.meta.arg;
      })
      .addCase(changeActiveChannel.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(changeActiveChannel.rejected, (state) => {});
  },
});

export const { addMessage, reset } = chatHistorySlice.actions;

export const selectActiveChannel = (state: RootState) =>
  state.chatHistory.activeChannel;
export const selectChatHistoryMessages = (state: RootState) =>
  state.chatHistory.messages;
export const selectNetworks = (state: RootState) => state.chatHistory;

export default chatHistorySlice.reducer;
