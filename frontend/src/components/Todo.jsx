import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { Form } from "./TodoStyle.js";
import api from "../service/api.js";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <main>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          api.post("/todo", { title, description }).then((response) => {
            console.log("Response:", response.status);
          });
        }}
      >
        <label>Título</label>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Descrição</label>
        <textarea
          name="description"
          rows="10"
          cols="70"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input type="submit" value="Cadastrar" />
      </Form>
      <Link to="/list">Todos</Link>
      <hr />
      <Outlet />
    </main>
  );
};

export default Todo;
