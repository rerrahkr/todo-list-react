import { type Todo, newId } from "@/types";
import { type Atom, atom } from "jotai";
import { splitAtom } from "jotai/utils";

const initialTodos: Todo[] = [
  {
    id: newId(),
    text: "todo 1",
  },
  {
    id: newId(),
    text: "todo 2",
  },
];

const todosAtom = atom(initialTodos);

export const todoAtomsAtom = splitAtom(todosAtom);

export const addTodoAtom = atom(null, (_, set, text: string) => {
  set(todosAtom, (prev) => [
    ...prev,
    {
      id: newId(),
      text,
    },
  ]);
});

export const removeTodoAtom = atom(null, (get, set, todoAtom: Atom<Todo>) => {
  const removedTodo = get(todoAtom);
  set(todosAtom, (prev) => prev.filter((todo) => todo.id !== removedTodo.id));
});

export const isEditingTodoTextAtom = atom<boolean>(false);
