import { type TodosState, useTodosStore } from "./store";

function useTodos(): TodosState["todos"] {
  return useTodosStore((state) => state.todos);
}

function useAddTodo(): TodosState["addTodo"] {
  return useTodosStore((state) => state.addTodo);
}

function useModifyTodo(): TodosState["modifyTodo"] {
  return useTodosStore((state) => state.modifyTodo);
}

function useRemoveTodo(): TodosState["removeTodo"] {
  return useTodosStore((state) => state.removeTodo);
}

export { useTodos, useAddTodo, useModifyTodo, useRemoveTodo };
