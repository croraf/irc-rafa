import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import networksReducer from "../features/networksSlice/networksSlice";
import chatHistoryReducer from "../features/chatHistorySlice/chatHistorySlice";

export const store = configureStore({
  reducer: {
    networks: networksReducer,
    counter: counterReducer,
    chatHistory: chatHistoryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
