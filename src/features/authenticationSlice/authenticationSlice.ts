import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { selectNetworks } from "../networksSlice/networksSlice";

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
    setAuthenticationStatus: (state, action: PayloadAction<AuthDescription>) => {
      state[action.payload.networkName] = action.payload.status;
    },
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

export const useAuthenticateAllNetworks = (
  indexDbLoaded: boolean,
  socket: Socket | undefined
) => {
  const networks = useAppSelector(selectNetworks);

  useEffect(() => {
    if (!socket || !indexDbLoaded) {
      return;
    }
    Object.values(networks).forEach((network) => {
      socket.emit("auth", {
        networkName: network.name,
        username: network.username,
        password: network.password,
      });
    });
  }, [socket, indexDbLoaded, networks]);
};
