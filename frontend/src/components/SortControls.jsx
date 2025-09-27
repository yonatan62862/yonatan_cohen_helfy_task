function SortControls({ sortBy, setSortBy }) {
  return (
    <div className="sort-controls">
      <label>Sort by: </label>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="createdAt">Date</option>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}

export default SortControls;
