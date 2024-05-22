import { removeTodoAtom, todoAtomsAtom } from "@/atoms";
import type { Todo } from "@/types";
import { Provider, useAtomValue, useSetAtom } from "jotai";
import type { PrimitiveAtom } from "jotai/experimental";
import type React from "react";
import { TodoListItem } from "./TodoListItem";

function TodoList(): React.JSX.Element {
  const todoAtoms = useAtomValue(todoAtomsAtom);
  const removeTodo = useSetAtom(removeTodoAtom);

  // Needs to prepare handler which use global state in Provider.
  const remove = (todoAtom: PrimitiveAtom<Todo>) => removeTodo(todoAtom);

  return (
    <ul>
      {todoAtoms.map((todoAtom) => (
        <Provider key={`${todoAtom}`}>
          <TodoListItem todoAtom={todoAtom} removeTodo={remove} />
        </Provider>
      ))}
    </ul>
  );
}

export { TodoList };
