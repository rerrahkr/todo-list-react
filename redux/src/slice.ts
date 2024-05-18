import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/react";
import { type Id, type Todo, newId } from "./types";

const initialState: Todo[] = [
  {
    id: newId(),
    text: "Todo1",
  },
  {
    id: newId(),
    text: "Todo2",
  },
];

const slice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    add: (state, { payload: text }: PayloadAction<string>) => {
      state.push({
        id: newId(),
        text,
      } satisfies Todo);
    },

    modify: (state, { payload: todo }: PayloadAction<Todo>) => {
      const stateTodo = state.find(({ id }) => id === todo.id);
      if (stateTodo) {
        stateTodo.text = todo.text;
      }
    },

    remove: (state, { payload: removedId }: PayloadAction<Id>) => {
      return state.filter(({ id }) => id !== removedId);
    },
  },
});

export const {
  add: addTodo,
  modify: modifyTodo,
  remove: removeTodo,
} = slice.actions;
export const reducer = slice.reducer;
