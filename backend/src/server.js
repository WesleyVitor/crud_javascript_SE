import express from "express";
import cors from "cors";
import { todoRepository } from "./repository/todoRepository.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use(logar);
// Isto está aberto, mas é uma possibilidade de autorização e posteriormente autenticação
function logar(req, res, next) {
  if (req.user == null) {
    req.user = 1;
  }
  next();
}

const authUser = (req, res, next) => {
  if (req.user == null) {
    res.status(403).json({ msg: "Not Allowed" });
  }
  next();
};

app.post("/todo", authUser, (req, res) => {
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

app.get("/todo", authUser, async (req, res) => {
  todoRepository.getAll().then((todos) => {
    if (todos.length > 0) {
      return res.status(200).json(todos);
    } else {
      return res.status(404).json([]);
    }
  });
});

app.get("/todo/:id", authUser, (req, res) => {
  const id = Number(req.params.id);
  todoRepository.getOne(id).then((todo) => {
    if (todo != undefined) {
      return res.status(200).json(todo);
    } else {
      return res.status(404).json({});
    }
  });
});

app.delete("/todo/:id", authUser, (req, res) => {
  const id = Number(req.params.id);
  todoRepository
    .deleteOne(id)
    .then(() => {
      res.status(200).json(id);
    })
    .catch((err) => {
      res.status(500).json({ msg: "db Error" });
    });
});

app.put("/todo/:id", authUser, (req, res) => {
  const id = Number(req.params.id);
  const newTodo = req.body;
  todoRepository
    .updateOne(id, newTodo)
    .then(() => {
      res.status(200).json(id);
    })
    .catch(() => {
      res.status(404).json();
    });
});

export default app;
