import { useAppDispatch } from "@/hooks";
import { modifyTodo, removeTodo } from "@/slice";
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

    const editInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (isEditing) {
        editInputRef.current?.focus();
        editInputRef.current?.select();
      }
    }, [isEditing]);

    const dispatch = useAppDispatch();

    const onChecked: ChangeEventHandler<HTMLInputElement> = () => {
      dispatch(removeTodo(id));
    };

    const onDoubleClicked: MouseEventHandler<HTMLLabelElement> = () => {
      setEditing((prev) => !prev);
    };

    const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (ev) => {
      switch (ev.key) {
        case "Enter":
          dispatch(modifyTodo({ id, text: ev.currentTarget.value }));
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
      dispatch(modifyTodo({ id, text: ev.currentTarget.value }));
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
