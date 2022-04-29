import { useEffect, useState } from "react";
import api from "../service/api";
import { Li } from "./ListTodoStyle";
const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    api.get("/todo").then((response) => {
      setTodos(response.data);
    });
  }, [todos]);
  return (
    <main>
      <ul>
        {todos.map((todo, index) => {
          if (!todo.done) {
            return (
              <Li key={index}>
                <div>
                  <p>
                    {" "}
                    <span>Título:</span>
                    {todo.title}
                  </p>
                </div>
                <div>
                  <p>
                    {" "}
                    <span>Descrição:</span>
                    {todo.description}
                  </p>
                </div>
              </Li>
            );
          }
        })}
      </ul>
    </main>
  );
};

export default ListTodos;
