import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const fetchTodos = async () => {
    const res = await axios.get("/todos");
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    await axios.post("/todos", { title: newTodo });
    setNewTodo("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/todos/${id}`);
    fetchTodos();
  };

  const summarizeTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/summarize");
      setToast({ type: "success", message: res.data.message });
    } catch (err) {
      setToast({
        type: "error",
        message: err?.response?.data?.error || "Failed to summarize",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold">📝 Todo Summary Assistant</h1>

        <div className="flex space-x-2">
          <input
            className="flex-grow border border-gray-300 px-3 py-2 rounded"
            placeholder="Add new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={addTodo}
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between border px-3 py-2 rounded"
            >
              <span>{todo.title}</span>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={summarizeTodos}
          className={`w-full py-2 rounded font-semibold text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize & Send to Slack"}
        </button>

        {toast && (
          <div
            className={`flex items-center justify-between p-4 rounded shadow text-white ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            } animate-fade-in-out`}
          >
            <div className="flex items-center space-x-2">
              <span className="text-xl">
                {toast.type === "success" ? "✅" : "❌"}
              </span>
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="ml-4 text-white hover:text-gray-200 font-bold"
            ></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
