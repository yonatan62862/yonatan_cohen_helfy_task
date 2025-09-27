export function filterTasks(tasks, filter, search) {
  let result = tasks;

  if (filter === "completed") result = result.filter((t) => t.completed);
  if (filter === "pending") result = result.filter((t) => !t.completed);

  if (search) {
    result = result.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  return result;
}

export function sortTasks(tasks, sortBy) {
  const sorted = [...tasks];
  if (sortBy === "title") {
    return sorted.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sortBy === "priority") {
    const order = { high: 3, medium: 2, low: 1 };
    return sorted.sort((a, b) => order[b.priority] - order[a.priority]);
  }
  if (sortBy === "createdAt") {
    return sorted.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }
  return sorted;
}
