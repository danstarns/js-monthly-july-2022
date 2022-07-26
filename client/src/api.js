export async function getTodos() {
  const response = await fetch("http://localhost:4000/todos");
  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function createTodo(title) {
  const response = await fetch("http://localhost:4000/todo", {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function commentOnTodo(todoId, comment) {
  const response = await fetch("http://localhost:4000/comment", {
    method: "POST",
    body: JSON.stringify({
      todoId,
      comment,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
