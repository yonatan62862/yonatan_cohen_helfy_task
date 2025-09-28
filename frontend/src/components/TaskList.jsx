import { useRef, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onToggle, onUpdate, onReorder }) {
  const containerRef = useRef(null);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => setIsDragging(false);

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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
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
