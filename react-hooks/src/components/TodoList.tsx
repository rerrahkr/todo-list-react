import { useTodos } from "@/hooks";
import type { Todo } from "@/types";
import type React from "react";
import { TodoListItem } from "./TodoListItem";

function TodoList(): React.JSX.Element {
  const todos: Todo[] = useTodos();

  return (
    <ul>
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export { TodoList };
