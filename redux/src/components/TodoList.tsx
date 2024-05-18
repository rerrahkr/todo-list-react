import { useTodosSelector } from "@/hooks";
import type React from "react";
import { TodoListItem } from "./TodoListItem";

function TodoList(): React.JSX.Element {
  const todos = useTodosSelector();

  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export { TodoList };
