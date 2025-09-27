const { Task, tasks } = require("../models/taskModel");

const getTasks = (req, res) => {
  res.json(tasks);
};

const createTask = (req, res) => {
  const { title, description, priority, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = new Task(title, description, priority, dueDate);
  tasks.push(newTask);

  res.status(201).json(newTask);
  console.log("BODY:", req.body);

};


const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, priority, dueDate } = req.body;

  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (title) task.title = title;
  if (description) task.description = description;
  if (priority) task.priority = priority;
  if (dueDate) task.dueDate = new Date(dueDate);

  res.json(task);
};


const deleteTask = (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === parseInt(id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  tasks.splice(index, 1);
  res.json({ message: "Task deleted" });
};

const toggleTask = (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === parseInt(id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.completed = !task.completed;
  res.json(task);
};

const reorderTasks = (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    return res.status(400).json({ error: "ids must be an array" });
  }

  const reordered = [];
  ids.forEach(id => {
    const task = tasks.find(t => t.id === parseInt(id));
    if (task) {
      reordered.push(task);
    } else {
      console.log("not found:", id);
    }
  });

  if (reordered.length !== tasks.length) {
    return res.status(400).json({ error: "Some tasks not found" });
  }

  tasks.length = 0;
  tasks.push(...reordered);

  res.json(tasks);
};


module.exports = { getTasks, createTask, updateTask, deleteTask, toggleTask, reorderTasks };
