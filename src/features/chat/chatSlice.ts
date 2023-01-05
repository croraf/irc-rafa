import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type ActiveChannel = { networkName: string; channelName: string } | null;

export const chatSlice = createSlice({
  name: "chat",
  initialState: null as ActiveChannel,
  reducers: {
    changeActiveChannel: (_state, action: PayloadAction<ActiveChannel>) => {
      return action.payload;
    },
  },
});

export const { changeActiveChannel } = chatSlice.actions;

export const selectActiveChannel = (state: RootState) => state.chat;

export default chatSlice.reducer;
