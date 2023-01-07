import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import networksReducer from "../features/networksSlice/networksSlice";
import chatHistoryReducer from "../features/chatHistorySlice/chatHistorySlice";
import authenticationReducer from "../features/authenticationSlice/authenticationSlice";
import unreadMessagesReducer from "../features/unreadMessagesSlice/unreadMessagesSlice";

export const store = configureStore({
  reducer: {
    networks: networksReducer,
    chatHistory: chatHistoryReducer,
    authentication: authenticationReducer,
    unreadMessages: unreadMessagesReducer,
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
