import type { Todo } from "@/types";
import { type PrimitiveAtom, useAtom } from "jotai";
import type React from "react";

import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  useEffect,
  useRef,
} from "react";

import { isEditingTodoTextAtom } from "@/atoms";

type Prop = {
  todoAtom: PrimitiveAtom<Todo>;
  removeTodo: (todoAtom: PrimitiveAtom<Todo>) => void;
};

function TodoListItem({ todoAtom, removeTodo }: Prop): React.JSX.Element {
  const [{ id, text }, setTodo] = useAtom(todoAtom);

  const [isEditing, setEditing] = useAtom(isEditingTodoTextAtom);

  const editInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
      editInputRef.current?.select();
    }
  }, [isEditing]);

  const onChecked: ChangeEventHandler<HTMLInputElement> = () => {
    removeTodo(todoAtom);
  };

  const onDoubleClicked: MouseEventHandler<HTMLLabelElement> = () => {
    setEditing((prev) => !prev);
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (ev) => {
    switch (ev.key) {
      case "Enter":
        setTodo((prev) => ({ ...prev, text: ev.currentTarget.value }));
        setEditing((prev) => !prev);
        break;

      case "Escape":
        setEditing((prev) => !prev);
        break;

      default:
        break;
    }
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = (ev) => {
    setTodo((prev) => ({ ...prev, text: ev.currentTarget.value }));
    setEditing((prev) => !prev);
  };

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          aria-label={`${id}:#`}
          defaultValue={text}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          ref={editInputRef}
        />
      ) : (
        <>
          <input
            type="checkbox"
            name={id}
            onChange={onChecked}
            checked={false}
          />
          <label htmlFor={id} onDoubleClick={onDoubleClicked}>
            {text}
          </label>
        </>
      )}
    </li>
  );
}

export { TodoListItem };
