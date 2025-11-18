import React, { useEffect, useState } from "react";
import Create from "./Create";
import Navbar from "./Navbar";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsTrashFill } from "react-icons/bs";

const Home = () => {
  const [todos, setTodos] = useState([]);

  // Fetch all todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get("https://backend-9p1z.onrender.com/todo/get", { withCredentials: true })
      .then((res) => {
        console.log("Fetched Todos:", res.data);
        setTodos(res.data);
      })
      .catch((err) => console.error(err));
  };

  //Handle marking a todo as done/undone
  const handleEdit = (id, currentDone) => {
    axios
      .put(
        `https://backend-9p1z.onrender.com/todo/update/${id}`,
        { done: !currentDone }, // send toggled done value
        { withCredentials: true }
      )
      .then((res) => {
        // Update only the changed todo locally, no reload
        setTodos((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((err) => console.error("❌ Update failed:", err));
  };


  //Deleting a Todo
  const handleDelete = (id) => {
    axios
      .delete(`https://backend-9p1z.onrender.com/todo/delete/${id}`, { withCredentials: true })
      .then(() => {
        // Remove the deleted todo locally, no reload
        setTodos((prev) => prev.filter((todo) => todo._id !== id));
      })
      .catch((err) => console.error(err));
  };

  // Handle adding a new todo instantly (passed to Create)
  const handleTaskAdded = (newTodo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <Navbar/>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center mt-15">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-6">Todo List</h2>

        {/* Pass the callback to Create */}
        <Create onTaskAdded={handleTaskAdded} />

        {todos.length === 0 ? (
          <div className="mt-6 text-gray-500 font-medium text-lg">
            <h2>No Records</h2>
          </div>
        ) : (
          <div className="task mt-6 space-y-3 text-left">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 border border-blue-200 rounded-md shadow-sm bg-blue-50 hover:bg-blue-100 transition-all"
              >
                {/* Left side: icon + text */}
                <div
                  className="flex items-center cursor-pointer"
                  type="checkbox"
                  checked={todo.done}
                  onClick={() => handleEdit(todo._id, todo.done)}
                >
                  {todo.done ? (
                    <BsFillCheckCircleFill className="text-green-500 text-lg mr-4" />
                  ) : (
                    <BsCircleFill className="text-gray-400 text-lg mr-4" />
                  )}
                  <span
                    className={`text-gray-800 ${todo.done ? "line-through text-gray-500" : ""
                      }`}
                  >
                    {todo.task}
                  </span>
                </div>

                {/* Right side: delete icon */}
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => handleDelete(todo._id)}
                >
                  <BsTrashFill />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
