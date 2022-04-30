import { useEffect, useState } from "react";
import api from "../service/api";
import { Table } from "./ListTodoStyle";
import { useOutletContext } from "react-router-dom";
const ListTodos = () => {
  const [todos, setTodos] = useState([]);
  const [handleUpdate] = useOutletContext();
  useEffect(() => {
    api.get("/todo").then((response) => {
      setTodos(response.data);
    });
  }, [todos]);

  const handleDelete = (todoID) => {
    api.delete(`/todo/${todoID}`);
  };

  const handleEditing = (todo) => {
    handleUpdate(todo);
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
                <td>
                  <button onClick={() => handleEditing(todo)}>Atualizar</button>
                </td>
              </tr>
            );
          }
        })}
      </tbody>
    </Table>
  );
};

export default ListTodos;
