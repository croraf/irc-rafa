import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ActiveChannel } from "../chatHistorySlice/chatHistorySlice";

export interface UnreadMessageStatus {
  networkName: string;
  channelName: string;
  numberOfUnread: number;
}

const initialState: Record<string, Record<string, number>> = {};

export const unreadMessagesSlice = createSlice({
  name: "unreadMessages",
  initialState,
  reducers: {
    addUnreadMessages: (state, action: PayloadAction<UnreadMessageStatus>) => {
      const network = state[action.payload.networkName];
      if (!network) {
        state[action.payload.networkName] = {};
      }

      const channel =
        state[action.payload.networkName][action.payload.channelName];
      if (!channel) {
        state[action.payload.networkName][action.payload.channelName] = 0;
      }

      state[action.payload.networkName][action.payload.channelName] +=
        action.payload.numberOfUnread;
    },
    clearUnreadMessages: (state, action: PayloadAction<ActiveChannel>) => {
      if (
        typeof state[action.payload.networkName]?.[
          action.payload.channelName
        ] === "number"
      ) {
        state[action.payload.networkName][action.payload.channelName] = 0;
      }
    },
  },
});

export const selectUnreadMessages = (state: RootState) => state.unreadMessages;

export const { addUnreadMessages, clearUnreadMessages } =
  unreadMessagesSlice.actions;

export default unreadMessagesSlice.reducer;
