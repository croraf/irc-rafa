import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { addModifyNetwork } from "../commonActions/commonActions";
import { selectIndexedDbStatus } from "../connectionsStatusesSlice/connectionsStatusesSlice";
import { upsertNetworkRow } from "../indexedDb/indexedDb";

interface ChannelDescription {
  name: string;
  description: string;
}

export interface NetworkDescription {
  networkName: string;
  url: string;
  port: string;
  username: string;
  password: string;
  channels: Record<string, ChannelDescription>;
}

export interface AddNetwork {
  networkName: string;
  url: string;
  port: string;
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
    /* addNetwork: (state, action: PayloadAction<AddNetwork>) => {
      state[action.payload.networkName] = {
        networkName: action.payload.networkName,
        url: action.payload.url,
        port: action.payload.port,
        username: action.payload.username,
        password: action.payload.password,
        channels: state[action.payload.networkName]
          ? state[action.payload.networkName].channels
          : {},
      };
    }, */
    addChannel: (state, action: PayloadAction<AddChannel>) => {
      state[action.payload.networkName].channels[action.payload.channelName] = {
        name: action.payload.channelName,
        description: "",
      };
    },
    reset: () => initialState,
  },
  extraReducers: (builder) =>
    builder.addCase(addModifyNetwork, (state, action) => {
      state[action.payload.networkName] = action.payload;
    }),
});

export const { addChannel, reset } = networksSlice.actions;

export const selectNetworks = (state: RootState) => state.networks;

export default networksSlice.reducer;

export const useStoreNetworkModification = (network: NetworkDescription) => {
  const indexedDbStatus = useAppSelector(selectIndexedDbStatus);

  useEffect(() => {
    if (indexedDbStatus === "connected") {
      upsertNetworkRow(network);
    }
  }, [indexedDbStatus, network]);
};
