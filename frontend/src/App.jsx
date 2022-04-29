import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./components/Todo";
import ListTodos from "./components/listTodo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />}>
            <Route path="list" element={<ListTodos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
