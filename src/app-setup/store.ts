import { configureStore } from "@reduxjs/toolkit";
import CommandHistorySlice from "../slices/CommandHistorySlice";

export const store = configureStore({
  reducer: { commandHistory: CommandHistorySlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
