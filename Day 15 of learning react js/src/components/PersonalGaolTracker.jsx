import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const PersonalGoalTracker = () => {
  // State for goals
  const [goals, setGoals] = useState(() => {
    const storedGoals = localStorage.getItem("goals");
    return storedGoals ? JSON.parse(storedGoals) : [];
  });

  // State for dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Save goals and dark mode to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [goals, darkMode]);

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subTasks",
  });

  // Add a new goal
  const addGoal = (data) => {
    if (!data.title || !data.deadline) return; // Basic validation
    const newGoal = {
      ...data,
      id: Date.now(),
      status: "Not Started",
      subTasks: data.subTasks || [],
    };
    setGoals([...goals, newGoal]);
    reset(); // Reset form after submission
  };

  // Delete a goal
  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  // Toggle goal status
  const toggleStatus = (id) => {
    setGoals(
      goals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              status: goal.status === "Completed" ? "Not Started" : "Completed",
            }
          : goal
      )
    );
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800"
      }`}
    >
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Personal Goal Tracker</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-all ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Goal Form */}
        <form
          onSubmit={handleSubmit(addGoal)}
          className={`p-6 rounded-lg shadow-lg mb-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                    : "bg-white border-gray-300 text-gray-800 focus:ring-blue-500"
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                {...register("description")}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                    : "bg-white border-gray-300 text-gray-800 focus:ring-blue-500"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Deadline</label>
              <input
                type="date"
                {...register("deadline", { required: "Deadline is required" })}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                    : "bg-white border-gray-300 text-gray-800 focus:ring-blue-500"
                }`}
              />
              {errors.deadline && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium">Priority</label>
              <select
                {...register("priority")}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                    : "bg-white border-gray-300 text-gray-800 focus:ring-blue-500"
                }`}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Sub-Tasks</label>
              {fields.map((field, index) => (
                <div key={field.id} className="flex space-x-2 mt-2">
                  <input
                    {...register(`subTasks.${index}.task`)}
                    className={`flex-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500"
                        : "bg-white border-gray-300 text-gray-800 focus:ring-blue-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => append({ task: "" })}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Sub-Task
              </button>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-all"
            >
              Add Goal
            </button>
          </div>
        </form>

        {/* Goal List */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              className={`p-6 rounded-lg shadow-lg flex flex-col space-y-4 transition-all hover:scale-105 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{goal.title}</h2>
                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${
                    goal.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {goal.status}
                </span>
              </div>
              <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                {goal.description}
              </p>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <strong>Deadline:</strong> {goal.deadline}
              </p>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <strong>Priority:</strong> {goal.priority}
              </p>
              {goal.subTasks.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sub-Tasks:</h3>
                  <ul className="list-disc list-inside">
                    {goal.subTasks.map((task, index) => (
                      <li key={index} className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {task.task}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleStatus(goal.id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                >
                  {goal.status === "Completed" ? "Mark In Progress" : "Mark Completed"}
                </button>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalGoalTracker;