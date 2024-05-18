import { addTodo, modifyTodo, reducer, removeTodo } from "./slice";
import { type Id, type Todo, newId } from "./types";

const initialState = [
  {
    id: newId(),
    text: "todo 1",
  },
] satisfies Todo[];

function generateUniqueId(existed: Id): Id {
  while (true) {
    const id = newId();
    if (id !== existed) {
      return id;
    }
  }
}

describe("slice", () => {
  test("initialize", () => {
    expect(reducer(initialState, { type: "unknown" })).toEqual(initialState);
  });

  test("addTodo", () => {
    const text = "todo 2";
    const newState = reducer(initialState, addTodo(text));

    expect(newState.length).toBe(2);
    expect(newState[0]).toEqual(initialState[0]);
    expect(newState[1].text).toBe(text);
  });

  test("modifyTodo", () => {
    const modifiedTodo: Todo = { ...initialState[0], text: "TODO" };
    expect(reducer(initialState, modifyTodo(modifiedTodo))[0]).toEqual(
      modifiedTodo
    );

    const invalidTodo: Todo = {
      ...initialState[0],
      id: generateUniqueId(initialState[0].id),
    };
    expect(reducer(initialState, modifyTodo(invalidTodo))[0]).toEqual(
      initialState[0]
    );
  });

  test("removeTodo", () => {
    expect(reducer(initialState, removeTodo(initialState[0].id))).toEqual([]);

    expect(
      reducer(initialState, removeTodo(generateUniqueId(initialState[0].id)))
    ).toEqual(initialState);
  });
});
