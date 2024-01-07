import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    nextCommand: (state) => {
      if (!state.enabled) {
        state.enabled = true;
        state.current = state.history[state.pointer];
        return;
      }
      if (state.pointer < state.history.length) {
        state.current = state.history[state.pointer];
        state.pointer++;
      }
    },
    prevCommand: (state) => {
      state.current = state.history[state.pointer];
      if (state.pointer > 0) {
        state.pointer--;
      }
      if (state.pointer === 0 && state.enabled) {
        state.enabled = false;
        state.current = "";
      }
    },
    resetHistoryState: (state) => {
      state.enabled = false;
      state.pointer = 0;
    },
    addCommand: (state, action: PayloadAction<string>) => {
      state.history.unshift(action.payload.trim());
    },
    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const {
  nextCommand,
  prevCommand,
  resetHistoryState,
  addCommand,
  clearHistory,
} = CommandHistorySlice.actions;
export default CommandHistorySlice.reducer;
