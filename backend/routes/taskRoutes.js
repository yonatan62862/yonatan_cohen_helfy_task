const express = require("express");
const { getTasks, createTask, updateTask, deleteTask, toggleTask, reorderTasks } = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/reorder", reorderTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleTask);


module.exports = router;
