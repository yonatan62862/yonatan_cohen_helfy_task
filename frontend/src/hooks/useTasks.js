import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
  updateTask,
  reorderTasks,
} from "../services/api";

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      await createTask(task);
      loadTasks();
    } catch {
      setError("Failed to add task");
    }
  };

  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  const toggleTaskStatus = async (id) => {
    try {
      await toggleTask(id);
      loadTasks();
    } catch {
      setError("Failed to toggle task");
    }
  };

  const editTask = async (id, task) => {
    try {
      await updateTask(id, task);
      loadTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  const reorder = async (startIndex, endIndex) => {
    const updated = [...tasks];
    const [moved] = updated.splice(startIndex, 1);
    updated.splice(endIndex, 0, moved);
    setTasks(updated);

    try {
      await reorderTasks(updated.map((t) => t.id));
    } catch (err) {
      console.error("Failed to save order", err);
    }
  };

  return {
    tasks,
    loading,
    error,
    addTask,
    removeTask,
    toggleTaskStatus,
    editTask,
    reorder,
  };
}
