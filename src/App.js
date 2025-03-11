import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const url = "https://todoserverside.azurewebsites.net/todos";

  useEffect(() => {
    axios.get(url).then((res) => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (!task) return;
    const res = await axios.post(url, { task });
    setTodos([...todos, res.data]);
    setTask("");
  };

  const toggleComplete = async (id, completed) => {
    await axios.put(`${url}/${id}`, {
      completed: !completed,
    });
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${url}/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="container">
      <h2>To-Do App</h2>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span
              style={{ textDecoration: todo.completed ? "line-through" : "" }}
            >
              {todo.task}
            </span>
            <button onClick={() => toggleComplete(todo._id, todo.completed)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
