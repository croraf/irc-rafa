import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import chatReducer from "../features/chat/chatSlice";
import chatHistoryReducer from "../features/chatHistory/chatHistorySlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chat: chatReducer,
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
