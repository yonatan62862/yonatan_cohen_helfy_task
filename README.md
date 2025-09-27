# Task Manager

Task Manager is a full-stack application for managing personal tasks. It allows users to **create, update, delete, filter, search, sort, and reorder** tasks, with support for priorities, due dates, and dark mode.

## Features

* **CRUD Operations**: Create, Read, Update, Delete tasks.
* **Task Priorities**: Low, Medium, High.
* **Due Dates**: Assign deadlines to tasks.
* **Toggle Completion**: Mark tasks as completed/pending.
* **Search & Filter**: Search by title, filter by status (all, completed, pending).
* **Sorting**: Sort tasks by title, priority, or creation date.
* **Reorder (Drag & Drop)**: Rearrange tasks with drag & drop, order saved in backend.
* **Infinite Carousel**: Tasks displayed in a smooth scrolling carousel.
* **Dark Mode**: Toggle between light and dark themes.
* **Responsive Design**: Works well on both desktop and mobile.

## Tech Stack

**Frontend:**
* React (Vite)
* CSS (custom styles, responsive design)

**Backend:**
* Node.js + Express
* In-memory data model (for simplicity)

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx
│   ├── components/
│   │   ├── TaskList.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskFilter.jsx
│   │   ├── SortControls.jsx
│   ├── hooks/
│   │   └── useTasks.js
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── taskUtils.js
│   └── styles/app.css
backend/
├── models/taskModel.js
├── controllers/taskController.js
├── routes/taskRoutes.js
└── server.js
```

## Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd task-manager
```

### 2. Install dependencies

**Backend**
```bash
cd backend
npm install
```

**Frontend**
```bash
cd ../frontend
npm install
```

### 3. Run the application

**Start backend**
```bash
cd backend
npm start
```
Runs on: http://localhost:4000

**Start frontend**
```bash
cd ../frontend
npm start
```
Runs on: http://localhost:5173

## API Endpoints

**Base URL:** `http://localhost:4000/api/tasks`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Get all tasks |
| POST | `/` | Create a new task |
| PUT | `/:id` | Update task by ID |
| DELETE | `/:id` | Delete task by ID |
| PATCH | `/:id/toggle` | Toggle completion status |
| PUT | `/reorder` | Reorder tasks by array of IDs |


## Future Improvements

* Persist tasks in a database (MongoDB / PostgreSQL).
* Add user authentication.
* Add reminders/notifications for due dates.

---

**Note**: This project is implemented as part of a **Fullstack Junior Engineer assignment** and is kept intentionally simple (in-memory backend, no DB).