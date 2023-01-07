import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface ChannelDescription {
  name: string;
  description: string;
}

export interface NetworkDescription {
  name: string;
  username: string;
  password: string;
  channels: Record<string, ChannelDescription>;
}

export interface AddNetwork {
  networkName: string;
  username: string;
  password: string;
}

export interface AddChannel {
  channelId: string;
  networkName: string;
  channelName: string;
}

const initialState: Record<string, NetworkDescription> = {};

export const networksSlice = createSlice({
  name: "networks",
  initialState,
  reducers: {
    addNetwork: (state, action: PayloadAction<AddNetwork>) => {
      if (state[action.payload.networkName] === undefined) {
        state[action.payload.networkName] = {
          name: action.payload.networkName,
          username: action.payload.username,
          password: action.payload.password,
          channels: {},
        };
      }
    },
    addChannel: (state, action: PayloadAction<AddChannel>) => {
      state[action.payload.networkName].channels[action.payload.channelName] = {
        name: action.payload.channelName,
        description: "",
      };
    },
    reset: () => initialState,
  },
});

export const { addNetwork, addChannel, reset } = networksSlice.actions;

export const selectNetworks = (state: RootState) => state.networks;

export default networksSlice.reducer;
