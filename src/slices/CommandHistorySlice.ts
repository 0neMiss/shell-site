//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";

interface CommandHistoryState {
  pointer: number;
  enabled: boolean;
  history: string[];
  current: string;
}
const intitialState: CommandHistoryState = {
  pointer: 0,
  enabled: false,
  history: [],
  current: "",
};

export const CommandHistorySlice = createSlice({
  name: "command-history-slice",
  state: intitialState,
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
    add: (state, command) => {
      state.history.unshift(command);
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { next, prev, resetHistoryState } = counterSlice.actions;
