import express from "express";
import cors from "cors";
import { todoRepository } from "./repository/todoRepository.js";
import {
  insertUser,
  getUserByUsernamePassword,
} from "./repository/userRepository.js";
import sessions from "express-session";
import cookieParser from "cookie-parser";
const app = express();
var session;
app.use(cors());
app.use(express.json());
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  sessions({
<<<<<<< HEAD
    secret: process.env.SESSION_KEY,
=======
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
>>>>>>> e06d0d7e6245950706928db7d4398947bb36a716
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);
app.use(cookieParser());

const authUser = (req, res, next) => {
  session = req.session;
  if (!session.userID) {
    res.status(404).json({ msg: "Miss Auth" });
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
  console.log("SESSION TODO:", req.session);
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

app.post("/user", async (req, res) => {
  const user = req.body;
  await insertUser(user)
    .then(() => {
      res.status(201).json(user);
    })
    .catch((e) => {
      res.status(500).json({ msg: e });
    });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await getUserByUsernamePassword(username, password);
  if (!user) {
    res.status(404).json({ msg: "User Not Found" });
    return;
  }

  session = req.session;
  if (!session.userID) {
    session.userID = username;
  }
  res.status(200).json({ msg: "OK" });
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});
export default app;
