import { useModifyTodo, useRemoveTodo } from "@/hooks";
import type { Todo } from "@/types";
import type React from "react";
import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

const TodoListItem = memo(
  ({ todo: { id, text } }: { todo: Todo }): React.JSX.Element => {
    const [isEditing, setEditing] = useState<boolean>(false);
    const toggleEditing = () => setEditing((prev) => !prev);

    const modifyTodo = useModifyTodo();
    const removeTodo = useRemoveTodo();

    const editInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (isEditing) {
        editInputRef.current?.focus();
        editInputRef.current?.select();
      }
    }, [isEditing]);

    const onChecked: ChangeEventHandler<HTMLInputElement> = () => {
      removeTodo(id);
    };

    const onDoubleClicked: MouseEventHandler<HTMLLabelElement> = () => {
      toggleEditing();
    };

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (ev) => {
      switch (ev.key) {
        case "Enter":
          modifyTodo({ id, text: ev.currentTarget.value });
          toggleEditing();
          break;

        case "Escape":
          toggleEditing();
          break;

        default:
          break;
      }
    };

    const onBlur: FocusEventHandler<HTMLInputElement> = (ev) => {
      modifyTodo({ id, text: ev.currentTarget.value });
      toggleEditing();
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
            <input type="checkbox" name={id} onChange={onChecked} />
            <label htmlFor={id} onDoubleClick={onDoubleClicked}>
              {text}
            </label>
          </>
        )}
      </li>
    );
  }
);

export { TodoListItem };
