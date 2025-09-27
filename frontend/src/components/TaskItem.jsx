import { useState } from "react";

function TaskItem({ task, onDelete, onToggle, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDesc, setNewDesc] = useState(task.description);
  const [newDueDate, setNewDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );

  const handleUpdate = () => {
    onUpdate(task.id, {
      title: newTitle,
      description: newDesc,
      dueDate: newDueDate ? new Date(newDueDate) : null,
    });
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <textarea
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
          <input
            type="date"
            value={newDueDate}
            onChange={(e) => setNewDueDate(e.target.value)}
          />
          <button onClick={handleUpdate}>Save</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          {task.dueDate && (
            <p className="due-date">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}

          <span className={`priority ${task.priority}`}>{task.priority}</span>

          <div className="actions">
            <button onClick={() => onToggle(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
