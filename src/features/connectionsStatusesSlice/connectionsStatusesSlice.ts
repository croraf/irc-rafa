import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type SocketStatus = "connected" | "pending" | "error";
type IndexedDbStatus = "connected" | "pending" | "error";

const initialState: {
  socketStatus: SocketStatus;
  indexedDbStatus: IndexedDbStatus;
} = { socketStatus: "pending", indexedDbStatus: "pending" };

export const connectionsStatusesSlice = createSlice({
  name: "connectionsStatuses",
  initialState,
  reducers: {
    setSocketStatus: (state, action: PayloadAction<SocketStatus>) => {
      state.socketStatus = action.payload;
    },
    setIndexedDbStatus: (state, action: PayloadAction<IndexedDbStatus>) => {
      state.indexedDbStatus = action.payload;
    },
  },
});

export const selectSocketStatus = (state: RootState) =>
  state.connectionsStatuses.socketStatus;
export const selectIndexedDbStatus = (state: RootState) =>
  state.connectionsStatuses.indexedDbStatus;
export const { setSocketStatus, setIndexedDbStatus } =
  connectionsStatusesSlice.actions;

export default connectionsStatusesSlice.reducer;
