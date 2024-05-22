import type React from "react";
import { EntryForm } from "./components/EntryForm";
import { TodoList } from "./components/TodoList";

function App(): React.JSX.Element {
  return (
    <>
      <h1>Todo List</h1>
      <EntryForm />
      <TodoList />
    </>
  );
}

export default App;
