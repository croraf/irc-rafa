import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { addModifyNetwork } from "../commonActions/commonActions";
import {
  selectIndexedDbStatus,
  selectSocketStatus,
} from "../connectionsStatusesSlice/connectionsStatusesSlice";
import { getSocket } from "../networking/socket";
import { NetworkDescription } from "../networksSlice/networksSlice";

export interface AuthDescription {
  networkName: string;
  status: AuthenticationStatus;
}

type AuthenticationStatus =
  // | "unauthenticated" <- this is undefined
  "authenticated" | "pending" | "error" | undefined;

const initialState: Record<string, AuthenticationStatus> = {};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthenticationStatus: (
      state,
      action: PayloadAction<AuthDescription>
    ) => {
      state[action.payload.networkName] = action.payload.status;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addModifyNetwork, (state, action) => {
      state[action.payload.networkName] = "pending";
    });
  },
});

export const selectAuthentication = (state: RootState) => state.authentication;
export const selectIsActiveChannelAuthenticated = (state: RootState) => {
  const activeNetwork = state.chatHistory.activeChannel?.networkName;
  if (activeNetwork) {
    return state.authentication[activeNetwork] === "authenticated";
  } else {
    return false;
  }
};

export const { setAuthenticationStatus } = authenticationSlice.actions;

export default authenticationSlice.reducer;

export const useAuthenticateNetwork = (network: NetworkDescription) => {
  const indexDbStatus = useAppSelector(selectIndexedDbStatus);
  const socketStatus = useAppSelector(selectSocketStatus);

  useEffect(() => {
    if (indexDbStatus === "connected" && socketStatus === "connected") {
      getSocket().emit("auth", {
        networkName: network.networkName,
        username: network.username,
        password: network.password,
      });
    }
  }, [
    indexDbStatus,
    socketStatus,
    network.networkName,
    network.username,
    network.password,
  ]);
};
