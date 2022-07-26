import express from "express";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const TODO_FILE = path.join(__dirname, "todos.json");
const PORT = 4000;

const app = express();
app.use(express.json());

app.get("/todos", async (req, res) => {
  const todos = await fs.promises.readFile(TODO_FILE, "utf-8");

  res.json(JSON.parse(todos)).end();
});

app.post("/todo", async (req, res) => {
  const { title } = req.body;
  const id = crypto.randomUUID();

  const todos = JSON.parse(await fs.promises.readFile(TODO_FILE, "utf-8"));

  todos.push({ id, title, comments: [] });

  await fs.promises.writeFile(TODO_FILE, JSON.stringify(todos, null, 2));

  res.json({ id }).end();
});

app.post("/comment", async (req, res) => {
  const { todoId, comment } = req.body;
  const id = crypto.randomUUID();

  let todos = JSON.parse(await fs.promises.readFile(TODO_FILE, "utf-8"));

  todos = todos.map((todo) => {
    if (todo.id !== todoId) {
      return todo;
    }

    todo.comments.push({
      id,
      comment,
    });

    return todo;
  });

  await fs.promises.writeFile(TODO_FILE, JSON.stringify(todos, null, 2));

  res.json({ id }).end();
});

async function main() {
  await app.listen(PORT);

  console.log(`App online port: ${PORT}`);
}

main();
