import { type Todo, newId } from "@/types";
import { renderWithProviders } from "@/utils/test";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TodoListItem } from "./TodoListItem";

const todo = {
  id: newId(),
  text: "dummy",
} satisfies Todo;

function initialRender(): ReturnType<typeof renderWithProviders> {
  return renderWithProviders(
    <ul>
      <TodoListItem todo={todo} />
    </ul>,
    {
      preloadedState: {
        todos: [todo],
      },
    }
  );
}

describe("TodoListItem", () => {
  describe("Initialize", () => {
    test("render", () => {
      initialRender();

      const item = screen.getByRole("listitem");
      expect(item).toBeInTheDocument();

      const label = screen.getByText(todo.text);
      expect(label).toBeInTheDocument();

      const checkbox = screen.getByLabelText(todo.text);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("Event", () => {
    test("Edit by double-click", async () => {
      const user = userEvent.setup();

      initialRender();

      await user.dblClick(screen.getByText(todo.text));

      const editor = screen.getByDisplayValue<HTMLInputElement>(todo.text);
      expect(editor).toBeInTheDocument();
      expect(editor).toHaveFocus();

      expect(screen.queryByText(todo.text)).not.toBeInTheDocument();
      expect(screen.queryByLabelText(todo.text)).not.toBeInTheDocument();

      const text1 = "DUMMY";
      await user.clear(editor);
      await user.type(editor, text1);
      await user.keyboard("{Enter}");

      expect(screen.queryByDisplayValue(text1)).not.toBeInTheDocument();
      expect(screen.getByText(text1)).toBeInTheDocument();
      expect(screen.getByLabelText(text1)).toBeInTheDocument();

      await user.dblClick(screen.getByText(text1));
      const text2 = "Dummy";
      await user.type(editor, text2);
      await user.click(document.body);
      expect(screen.getByText(text2)).toBeInTheDocument();

      await user.dblClick(screen.getByText(text1));
      const text3 = "DummY";
      await user.type(editor, text3);
      await user.keyboard("{Escape}");
      expect(screen.getByText(text2)).toBeInTheDocument();
    });
  });
});
