import { useCallback, useEffect, useState } from "react";
import * as api from "./api";

function Comment({ comment }) {
  return (
    <div>
      <h3 className="text-sm block mb-0 leading-none">{comment.comment}</h3>
    </div>
  );
}

function Todo({ todo, commentOnTodo }) {
  const onSubmit = useCallback(async (event) => {
    event.preventDefault();

    const comment = event.target.elements.comment.value;

    await commentOnTodo(todo.id, comment);

    event.target.reset();
  }, []);

  return (
    <div className="p-5 bg-white shadow-lg rounded-lg">
      <h2 className="font-bold text-xl block mb-0 leading-none">
        {todo.title}
      </h2>

      <div className="m-5">
        <div className="d-flex flex-col space-y-5">
          {todo.comments.map((comment) => (
            <Comment key={comment.id} comment={comment}></Comment>
          ))}
        </div>
      </div>

      <div className="m-5">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="comment"
            placeholder="Enter Comment"
            className="text-xs m-0 rounded-xl p-2 border"
          />
          <button
            type="submit"
            className="ml-2 text-xs bg-blue-400 hover:bg-blue-700 text-white font-bold p-2 rounded-xl"
          >
            Comment
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    (async () => {
      setTodos(await api.getTodos());
    })();
  }, []);

  const addTodo = useCallback(
    async (event) => {
      event.preventDefault();

      const title = event.target.elements.title.value;

      await api.createTodo(title);

      event.target.reset();

      setTodos(await api.getTodos());
    },
    [setTodos]
  );

  const commentOnTodo = useCallback(
    async (todoId, comment) => {
      await api.commentOnTodo(todoId, comment);

      setTodos(await api.getTodos());
    },
    [setTodos]
  );

  return (
    <div className="bg-orange-200 flex justify-center h-screen p-10">
      <div className="container w-full max-w-2xl flex flex-col">
        <div>
          <form onSubmit={addTodo} className="flex justify-center">
            <input
              type="text"
              name="title"
              placeholder="Enter Todo"
              className="mr-5 rounded-xl p-4"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-xl"
            >
              Add
            </button>
          </form>
        </div>
        <div className="bg-gray-100 mt-5 p-5 rounded-xl shadow-lg text-gray-700 flex flex-col space-y-5">
          {todos.length ? (
            todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                commentOnTodo={commentOnTodo}
              ></Todo>
            ))
          ) : (
            <p>No todos, try adding one!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
