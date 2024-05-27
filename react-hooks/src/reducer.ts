import type { ImmerReducer } from "use-immer";
import { type Id, type Todo, newId } from "./types";

type TodosAction =
  | {
      type: "addTodo";
      payload: string;
    }
  | {
      type: "modifyTodo";
      payload: { id: Id; text: string };
    }
  | {
      type: "removeTodo";
      payload: Id;
    };

const reducer: ImmerReducer<Todo[], TodosAction> = (draft, action) => {
  switch (action.type) {
    case "addTodo":
      draft.push({ id: newId(), text: action.payload });
      break;

    case "modifyTodo": {
      const stateTodo = draft.find(({ id }) => id === action.payload.id);
      if (stateTodo) {
        stateTodo.text = action.payload.text;
      }
      break;
    }

    case "removeTodo":
      return draft.filter(({ id }) => id !== action.payload);
  }
};

function addTodo(text: string): TodosAction {
  return {
    type: "addTodo",
    payload: text,
  };
}

function modifyTodo(id: Id, text: string): TodosAction {
  return {
    type: "modifyTodo",
    payload: { id, text },
  };
}

function removeTodo(id: Id): TodosAction {
  return {
    type: "removeTodo",
    payload: id,
  };
}

export { reducer, type TodosAction, addTodo, modifyTodo, removeTodo };
