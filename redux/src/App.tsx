import type React from "react";
import { Provider } from "./Provider";
import { EntryForm } from "./components/EntryForm";
import { TodoList } from "./components/TodoList";

function App(): React.JSX.Element {
  return (
    <>
      <h1>Todo List</h1>
      <Provider>
        <EntryForm />
        <TodoList />
      </Provider>
    </>
  );
}

export default App;
