import express from "express";
import { TodoRepository } from "./repository/persistence.js";
const app = express();
app.use(express.json());
app.post("/todo", (req, res) => {
  const todo = req.body;
  console.log("Todo:", req);
  const todoRepository = new TodoRepository();
  todoRepository.insertTodo(todo).then(() => {
    res.status(201).json(todo);
  });
});

export default app;
