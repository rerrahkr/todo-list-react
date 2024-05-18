import { type Todo, newId } from "@/types";
import { renderWithProviders } from "@/utils/test";
import { screen } from "@testing-library/react";
import { TodoList } from "./TodoList";

const todos = [
  {
    id: newId(),
    text: "item 1",
  },
  {
    id: newId(),
    text: "item 2",
  },
] satisfies Todo[];

describe("TodoList", () => {
  test("render", () => {
    renderWithProviders(<TodoList />, {
      preloadedState: {
        todos: todos,
      },
    });

    const ul = screen.getByRole("list");
    expect(ul).toBeInTheDocument();

    const items = screen.getAllByRole("listitem");
    expect(items.length).toBe(todos.length);

    todos.forEach((todo, i) => {
      expect(items[i]).toHaveTextContent(todo.text);
    });
  });
});
