import type React from "react";
import { useContext } from "react";
import { TodosContext, TodosDispatchContext } from "./Provider";
import type { TodosAction } from "./reducer";
import type { Todo } from "./types";

function useTodos(): Todo[] {
  return useContext(TodosContext);
}

function useTodosDispatch(): React.Dispatch<TodosAction> {
  return useContext(TodosDispatchContext);
}

export { useTodos, useTodosDispatch };
