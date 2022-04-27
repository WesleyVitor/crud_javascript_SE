import express from "express";
const app = express();

app.post("/todo/", (req, res) => {
  const { title, description } = req.body;

  res.status(201).json({ msg: "ok" });
});

export default app;
