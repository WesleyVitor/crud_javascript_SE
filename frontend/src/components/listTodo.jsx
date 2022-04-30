import { useEffect, useState } from "react";
import api from "../service/api";
import { Table } from "./ListTodoStyle";
const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    api.get("/todo").then((response) => {
      setTodos(response.data);
    });
  }, [todos]);

  const handleDelete = (todoID) => {
    api.delete(`/todo/${todoID}`);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Descrição</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => {
          if (!todo.done) {
            return (
              <tr key={index}>
                <td>
                  <p>|{todo.title}</p>
                </td>
                <td>
                  <p>|{todo.description}</p>
                </td>
                <td>
                  <button onClick={() => handleDelete(todo.id)}>Deletar</button>
                </td>
              </tr>
            );
          }
        })}
      </tbody>
      <ul></ul>
    </Table>
  );
};

export default ListTodos;
