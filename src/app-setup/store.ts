import { configureStore } from "@reduxjs/toolkit";
import { CommandHistorySlice } from "../slices/CommandHistorySlice";

const store = configureStore({ reducer: CommandHistorySlice.reducer });
