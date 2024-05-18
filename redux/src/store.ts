import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as todoReducer } from "./slice";

const appReducer = combineReducers({
  todos: todoReducer,
});

const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: appReducer,
    preloadedState,
  });
};

export { setupStore };

export type RootState = ReturnType<typeof appReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
