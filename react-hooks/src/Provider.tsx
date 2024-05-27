import type React from "react";
import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { type TodosAction, reducer } from "./reducer";
import { type Todo, newId } from "./types";

const initialTodos: Todo[] = [
  {
    id: newId(),
    text: "Todo 1",
  },
  {
    id: newId(),
    text: "Todo 2",
  },
];

const TodosContext = createContext<Todo[]>([]);
const TodosDispatchContext = createContext<React.Dispatch<TodosAction>>(
  () => {}
);

function TodosProvider({
  children,
}: { children: React.ReactNode }): React.JSX.Element {
  const [todosState, dispatch] = useImmerReducer(reducer, initialTodos);

  return (
    <TodosContext.Provider value={todosState}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export { TodosContext, TodosDispatchContext, TodosProvider };
