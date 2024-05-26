import { EntryForm } from "@/components/EntryForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function getInput(): HTMLElement {
  return screen.getByRole("textbox");
}

function getAddButton(): HTMLElement {
  return screen.getByRole("button", { name: "Add" });
}

describe("EntryForm", () => {
  test("initialize", () => {
    render(<EntryForm />);

    const input = getInput();
    const button = getAddButton();

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");

    expect(button).toBeInTheDocument();
    expect(button).not.toBeEnabled();
  });

  describe("Entry", () => {
    test("if enter only space", async () => {
      render(<EntryForm />);

      const user = userEvent.setup();

      const input = getInput();
      const button = getAddButton();

      await user.type(input, " ");

      expect(input).toHaveValue(" ");

      expect(button).not.toBeEnabled();
    });

    test("if enter any character except space", async () => {
      render(<EntryForm />);

      const user = userEvent.setup();

      const input = getInput();
      const button = getAddButton();

      const text = "a";
      await user.type(input, text);

      expect(input).toHaveValue(text);

      expect(button).toBeEnabled();
    });
  });

  describe("Submit", () => {
    test("if pressed submit button", async () => {
      render(<EntryForm />);

      const user = userEvent.setup();

      const input = getInput();
      const button = getAddButton();

      const text = "a";
      await user.type(input, text);
      await user.click(button);

      expect(button).not.toBeEnabled();
      expect(input).toHaveValue("");
    });
  });
});
