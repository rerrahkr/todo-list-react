import { TodosProvider } from "./Provider";
import { EntryForm } from "./components/EntryForm";
import { TodoList } from "./components/TodoList";

function App() {
  return (
    <>
      <h1>Todo List</h1>
      <TodosProvider>
        <EntryForm />
        <TodoList />
      </TodosProvider>
    </>
  );
}

export default App;
