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
      if (state.pointer >= state.history.length) {
        return;
      }
      if (!state.enabled) {
        state.enabled = true;
      }
      state.current = state.history[state.pointer];
    },
    prevCommand: (state) => {
      if (state.pointer! <= 0) {
        state.pointer -= 1;
        state.current = state.history[state.pointer];
      }
    },
    resetHistoryState: (state) => {
      state.enabled = false;
      state.pointer = 0;
    },
    addCommand: (state, action: PayloadAction<string>) => {
      state.history.unshift(action.payload);
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
  enableHistory,
  disableHistory,
  clearHistory,
} = CommandHistorySlice.actions;
export default CommandHistorySlice.reducer;
