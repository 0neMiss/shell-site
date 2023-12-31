//@ts-nocheck
import { createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";

export type CommandHistoryState = {
  pointer: number;
  enabled: boolean;
  history: string[];
  current: string;
};
const initialState = {
  pointer: 0,
  enabled: false,
  history: [],
  current: "",
} as CommandHistoryState;

const CommandHistorySlice = createSlice({
  name: "command-history-slice",
  initialState,
  reducers: {
    next: (state) => {
      if (state.pointer! >= state.history.length) {
        state.pointer += 1;
        state.current = state.history[state.pointer];
      }
    },
    prev: (state) => {
      if (state.pointer! <= 0) {
        state.pointer -= 1;
        state.current = state.history[state.pointer];
      }
    },
    resetHistoryState: (state) => {
      state.enabled = false;
      state.pointer = 0;
    },
    add: (state: CommandHistoryState, action: PayloadAction<string>) => {
      state.history.unshift(action?.command);
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { next, prev, resetHistoryState } = CommandHistorySlice.actions;
export default CommandHistorySlice.reducer;
