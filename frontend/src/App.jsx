import { useState } from "react";
import { useTasks } from "./hooks/useTasks";
import { filterTasks, sortTasks } from "./utils/taskUtils";

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import SortControls from "./components/SortControls";

import "./styles/app.css";

function App() {
  const { tasks, loading, error, addTask, removeTask, toggleTaskStatus, editTask, reorder } =
    useTasks();

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sortBy, setSortBy] = useState("createdAt");

  const processedTasks = sortTasks(
    filterTasks(tasks, filter, search),
    sortBy
  );

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1>Task Manager</h1>
        <button
          className="dark-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <TaskForm onAdd={addTask} />
      <TaskFilter setFilter={setFilter} />

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <TaskList
        tasks={processedTasks}
        onDelete={removeTask}
        onToggle={toggleTaskStatus}
        onUpdate={editTask}
        onReorder={reorder}
      />

      <SortControls sortBy={sortBy} setSortBy={setSortBy} />
    </div>
  );
}

export default App;

