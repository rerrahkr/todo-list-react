import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { type Id, type Todo, newId } from "./types";

type TodosState = {
  todos: Todo[];
  addTodo: (text: string) => void;
  modifyTodo: (modifiedTodo: Todo) => void;
  removeTodo: (removedId: Id) => void;
};

const useTodosStore = create<TodosState>()(
  immer((set) => ({
    todos: [
      {
        id: newId(),
        text: "Todo 1",
      },
      {
        id: newId(),
        text: "Todo 2",
      },
    ],

    addTodo: (text: string) =>
      set((state) => {
        state.todos.push({
          id: newId(),
          text,
        });
      }),

    modifyTodo: (modifiedTodo: Todo) =>
      set((state) => {
        const stateTodo = state.todos.find(({ id }) => id === modifiedTodo.id);
        if (stateTodo) {
          stateTodo.text = modifiedTodo.text;
        }
      }),

    removeTodo: (removedId: Id) =>
      set((state) => {
        state.todos = state.todos.filter(({ id }) => id !== removedId);
      }),
  }))
);

export { useTodosStore, type TodosState };
