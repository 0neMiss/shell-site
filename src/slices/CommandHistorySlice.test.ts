import { configureStore } from "@reduxjs/toolkit";
import CommandHistorySlice from "./CommandHistorySlice";
import { nextCommand, addCommand } from "./CommandHistorySlice";

const configureStoreWithData = () => {
  const store = configureStore({
    reducer: { commandHistory: CommandHistorySlice },
  });
  store.dispatch(addCommand("help"));
  store.dispatch(addCommand("projects"));
  store.dispatch(addCommand("ls"));
  store.dispatch(addCommand("ls -a"));
  return store;
};

describe("Command History Suite", () => {
  it("Should initialize default state", () => {
    const store = configureStore({
      reducer: { commandHistory: CommandHistorySlice },
    });
    const { commandHistory } = store.getState();
    expect(commandHistory).toMatchObject({
      pointer: 0,
      enabled: false,
      history: [],
      current: "",
    });
  });
  it("should add commands in historical order", () => {
    const store = configureStoreWithData();
    const { commandHistory } = store.getState();
    expect(commandHistory.history).toEqual(["ls -a", "ls", "projects", "help"]);
  });
  it("should go to the next command in history", () => {
    const store = configureStoreWithData();
    store.dispatch(nextCommand());
    const {
      commandHistory: { current, pointer },
    } = store.getState();
    expect(current).toBe("ls -a");
    expect(pointer).toBe(1);

    store.dispatch(nextCommand());
    const {
      commandHistory: { current: nextCurrent, pointer: nextPointer },
    } = store.getState();
    expect(nextCurrent).toBe("ls");
    expect(nextPointer).toBe(2);
  });
  it("should go to the previous command in history", () => {});
});
