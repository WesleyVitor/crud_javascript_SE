import express from "express";
import { TodoRepository } from "./repository/persistence.js";
const app = express();
app.use(express.json());

const todoRepository = new TodoRepository();

app.post("/todo", (req, res) => {
  const todo = req.body;

  todoRepository
    .insertTodo(todo)
    .then(() => {
      res.status(201).json(todo);
    })
    .catch((err) => {
      res.status(500).json({ msg: "db Error" });
    });
});

app.get("/todo", async (req, res) => {
  todoRepository.getAll().then((todos) => {
    if (todos) {
      return res.status(200).json(todos);
    }
  });
});

export default app;
