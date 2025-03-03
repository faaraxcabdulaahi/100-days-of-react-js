import { useState } from "react";
import "../index.css";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [darkMode, setDarkMode] = useState(true); // Default: Dark Mode

  // Add Task function
  const addTask = () => {
    if (inputValue.trim()) {
      const newTask = { task: inputValue, completed: false };
      setTasks([...tasks, newTask]);
      setInputValue("");
    }
  };

  // Handle Task Completion
  const handleCompletionTask = (index) => {
    const updatedTask = tasks.map((task, itemId) =>
      itemId === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTask);
  };

  // Handle Delete Task
  const handleDeleteTask = (index) => {
    const deletedTask = tasks.filter((_, itemId) => itemId !== index);
    setTasks(deletedTask);
  };

  // Handle Edit Task
  const handlEditTask = (index) => {
    const editedTask = prompt("Edit the task", tasks[index].task);
    if (editedTask && editedTask.trim()) {
      const newEditedTask = tasks.map((task, itemId) =>
        itemId === index ? { ...task, task: editedTask } : task
      );
      setTasks(newEditedTask);
    }
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 p-2 rounded-full ${
          darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        {darkMode ? "🌙" : "☀️"}
      </button>

      <h1 className={`text-4xl font-bold mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
        Todo List
      </h1>

      {/* Input and Add Task Button */}
      <div className="flex items-center gap-1 mb-6">
        <input
          className={`p-3 w-64 border rounded-md shadow-sm outline-none focus:ring-2 ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white focus:ring-blue-500"
              : "bg-white border-blue-400 text-gray-800 focus:ring-blue-500"
          }`}
          type="text"
          value={inputValue}
          placeholder="Enter a task"
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            darkMode ? "hover:bg-blue-600" : "hover:bg-blue-600"
          }`}
          onClick={addTask}
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <ul className="w-[350px] space-y-4">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-3 shadow-md rounded-md border ${
              darkMode
                ? task.completed
                  ? "bg-gray-700 border-gray-600"
                  : "bg-gray-800 border-gray-700"
                : task.completed
                ? "bg-gray-200 border-gray-300"
                : "bg-white border-gray-200"
            }`}
          >
            <span
              className={`text-lg font-medium ${
                task.completed
                  ? darkMode
                    ? "line-through text-gray-400"
                    : "line-through text-gray-500"
                  : darkMode
                  ? "text-gray-100"
                  : "text-gray-800"
              }`}
            >
              {task.task}
            </span>

            {/* Task Actions */}
            <div className="flex gap-2">
              <button
                className={`px-3 py-2 text-md font-medium rounded-md transition ${
                  task.completed
                    ? darkMode
                      ? "bg-yellow-500 text-white hover:bg-yellow-600"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                    : darkMode
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
                onClick={() => handleCompletionTask(index)}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>

              <button
                className={`px-3 py-1 text-md font-medium rounded-md transition ${
                  darkMode
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-red-500 text-white hover:bg-red-600"
                }`}
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>

              <button
                className={`px-3 py-1 text-md font-medium rounded-md transition ${
                  darkMode
                    ? "bg-blue-400 text-white hover:bg-blue-500"
                    : "bg-blue-400 text-white hover:bg-blue-500"
                }`}
                onClick={() => handlEditTask(index)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;