let tasks = [];
let idCounter = 1;

class Task {
  constructor(title, description, priority, dueDate) {
    this.id = idCounter++;
    this.title = title;
    this.description = description;
    this.completed = false;
    this.createdAt = new Date();
    this.priority = priority || "medium";
    this.dueDate = dueDate ? new Date(dueDate) : null; 
  }
}


module.exports = { Task, tasks };
