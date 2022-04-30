import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Form } from "./TodoStyle.js";
import api from "../service/api.js";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentID, setCurrentID] = useState(0);
  const handleUpdate = (todo) => {
    setEditing(true);
    setCurrentID(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
  };

  return (
    <main>
      {editing ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            api.put(`/todo/${currentID}`, { title, description });
          }}
        >
          <label>Título</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Descrição</label>
          <textarea
            name="description"
            value={description}
            rows="10"
            cols="70"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input type="submit" value="Atualizar" />
        </Form>
      ) : (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            api.post("/todo", { title, description });
          }}
        >
          <label>Título</label>
          <input
            type="text"
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Descrição</label>
          <textarea
            name="description"
            value={description}
            rows="10"
            cols="70"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input type="submit" value="Cadastrar" />
        </Form>
      )}

      <Link to="/list">Todos</Link>
      <hr />
      <Outlet context={[handleUpdate]} />
    </main>
  );
};

export default Todo;
