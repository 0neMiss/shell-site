import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HistoryState {
  commandHistory: string[];
  currentIndex: number;
}

const initialState: HistoryState = {
  commandHistory: [],
  currentIndex: -1,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addCommand(state, action: PayloadAction<string>) {
      state.commandHistory.unshift(action.payload);
      state.currentIndex = state.commandHistory.length - 1;
    },
    prevCommand(state) {
      if (state.currentIndex > -1) {
        state.currentIndex--;
      }
    },
    nextCommand(state) {
      if (state.currentIndex < state.commandHistory.length - 1) {
        state.currentIndex++;
      }
    },
    resetHistoryState(state) {
      state.currentIndex = state.currentIndex = -1;
    },
  },
});

export const { addCommand, prevCommand, nextCommand, resetHistoryState } =
  historySlice.actions;

export default historySlice.reducer;
