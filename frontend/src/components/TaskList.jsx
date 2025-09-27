import { useRef, useEffect, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle, onUpdate, onReorder }) {
  const containerRef = useRef(null);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    let animationFrame;

    const scroll = () => {
      if (!paused) {
        scrollAmount += 1; 
        container.scrollLeft = scrollAmount;

        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0;
          container.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, [tasks, paused]);

  const handleDragStart = (index) => setDraggedIndex(index);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (index) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorder(draggedIndex, index);
    }
    setDraggedIndex(null);
  };

  if (!tasks.length) return <p>No tasks found</p>;

  return (
    <div
      ref={containerRef}
      className="carousel-container"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-content">
        {tasks.map((task, idx) => (
          <div
            key={task.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(idx)}
          >
            <TaskItem
              task={task}
              onDelete={onDelete}
              onToggle={onToggle}
              onUpdate={onUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
