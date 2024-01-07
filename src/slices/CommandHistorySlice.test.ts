import { configureStore } from "@reduxjs/toolkit";
import CommandHistorySlice, { prevCommand } from "./CommandHistorySlice";
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

describe("Command History Method unit Suite", () => {
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
    let {
      commandHistory: { current, pointer },
    } = store.getState();
    expect(current).toBe("ls -a");
    expect(pointer).toBe(0);

    store.dispatch(nextCommand());
    const {
      commandHistory: { current: nextCurrent, pointer: nextPointer },
    } = store.getState();
    expect(nextCurrent).toBe("ls");
    expect(nextPointer).toBe(1);
  });
  it("when calling nextCommand and reaching the end of the list, it doesnt go any further", () => {
    const store = configureStoreWithData();
    const bigArray = Array.from({ length: 50 }, (v, i) => i);
    bigArray.forEach(() => {
      store.dispatch(nextCommand());
    });
    const {
      commandHistory: { pointer, current },
    } = store.getState();
    expect(current).toBe("help");
    expect(pointer).toBe(4);
  });

  it("previousCommand should disable after hitting its start, and not allow us out of bounds of the history array", () => {
    const store = configureStoreWithData();
    const bigArray = Array.from({ length: 50 }, (_v, i) => i);
    bigArray.forEach(() => {
      store.dispatch(nextCommand());
    });
    bigArray.forEach(() => {
      store.dispatch(prevCommand());
    });
    const {
      commandHistory: { enabled, pointer, current },
    } = store.getState();
    expect(enabled).toBe(false);
    expect(pointer).toBe(0);
    expect(current).toBe("");
  });
});
describe("CommandHistorySlice integration tests", () => {
  it("can navigate back and forth with next and prev command calls", () => {
    const store = configureStoreWithData();
    store.dispatch(nextCommand());
    store.dispatch(nextCommand());
    store.dispatch(prevCommand());
    const stateOne = store.getState();
    expect(stateOne.commandHistory.history).toEqual([
      "ls -a",
      "ls",
      "projects",
      "help",
    ]);
    expect(stateOne.commandHistory.pointer).toBe(0);
    expect(stateOne.commandHistory.current).toBe("la -a");
    expect(stateOne.commandHistory.enabled).toBeTruthy();
    store.dispatch(prevCommand());
    const stateTwo = store.getState();
    expect(stateTwo.commandHistory.enabled).toBe(true);
    expect(stateTwo.commandHistory.current).toBe("ls -a");
    expect(stateTwo.commandHistory.pointer).toBe(0);
  });
});
