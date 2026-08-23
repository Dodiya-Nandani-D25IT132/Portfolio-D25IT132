import { useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../api";

function Tasks() {
    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [toast, setToast] = useState("");
    const showToast = (message) => {setToast(message);
            setTimeout(() => {
            setToast("");
        }, 2500);
    };

    // =========================
    // GET - Load all tasks
    // =========================

    const loadTasks = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getTasks();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Load tasks when page opens
    useEffect(() => {
        loadTasks();
    }, []);

    // =========================
    // POST - Create task
    // =========================

    const handleCreate = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError("Task title is required");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await createTask({
                title,
                description,
                priority
            });

            showToast("Task created successfully!");

            // Clear form
            setTitle("");
            setDescription("");
            setPriority("medium");

            // Reload tasks
            await loadTasks();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // PUT - Update task
    // =========================

    const handleUpdate = async (task) => {
        try {
            setLoading(true);
            setError("");

            await updateTask(task._id, {
                title: task.title,
                description: task.description,
                completed: !task.completed,
                priority: task.priority
            });

            showToast("Task updated successfully!");

            await loadTasks();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // DELETE - Delete task
    // =========================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setLoading(true);
            setError("");

            await deleteTask(id);

            showToast("Task deleted successfully!");

            await loadTasks();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // =========================
    // UI
    // =========================

    return (
        <div className="tasks-page">

            {toast && (
                <div className="toast">
                ✓ {toast}
                </div>
            )}

            {/* Header */}
            <div className="tasks-header">

                <p className="section-label">
                    FULL STACK PROJECT
                </p>

                <h1>Task Management</h1>

                <p>
                    Manage your tasks using React, Express, MongoDB
                    and Mongoose.
                </p>

            </div>


            {/* Create Task */}
            <div className="task-form-card">

                <h2>Add New Task</h2>

                <form
                    onSubmit={handleCreate}
                    className="task-form"
                >

                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <select
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >

                        <option value="low">
                            Low Priority
                        </option>

                        <option value="medium">
                            Medium Priority
                        </option>

                        <option value="high">
                            High Priority
                        </option>

                    </select>

                    <button
                        type="submit"
                        className="add-task-btn"
                    >
                        + Add Task
                    </button>

                </form>

            </div>


            {/* Loading */}
            {loading && (
                <p className="task-message">
                    Loading tasks...
                </p>
            )}


            {/* Error */}
            {error && (
                <p className="task-error">
                    Error: {error}
                </p>
            )}


            {/* Tasks Section */}
            <div className="tasks-section">

                <div className="tasks-section-title">

                    <h2>My Tasks</h2>

                    <span>
                        {tasks.length}{" "}
                        {tasks.length === 1
                            ? "Task"
                            : "Tasks"}
                    </span>

                </div>


                {/* Task Cards */}
                <div className="task-grid">

                    {tasks.map((task) => (

                        <div
                            className={`task-card ${
                                task.completed
                                    ? "completed"
                                    : ""
                            }`}
                            key={task._id}
                        >

                            {/* Top section */}
                            <div className="task-card-top">

                                <span
                                    className={`priority priority-${task.priority}`}
                                >
                                    {task.priority}
                                </span>

                                <span className="task-status">

                                    {task.completed
                                        ? "✓ Completed"
                                        : "○ Pending"}

                                </span>

                            </div>


                            {/* Task title */}
                            <h3>
                                {task.title}
                            </h3>


                            {/* Description */}
                            <p className="task-description">
                                {task.description ||
                                    "No description provided."}
                            </p>


                            {/* Date */}
                            {task.createdAt && (
                                <p className="task-date">
                                    Created:{" "}
                                    {new Date(
                                        task.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            )}


                            {/* Buttons */}
                            <div className="task-actions">

                                <button
                                    onClick={() =>
                                        handleUpdate(task)
                                    }
                                    className="complete-btn"
                                >

                                    {task.completed
                                        ? "Mark Pending"
                                        : "Complete"}

                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(
                                            task._id
                                        )
                                    }
                                    className="delete-btn"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}


                    {/* Empty state */}
                    {tasks.length === 0 &&
                        !loading && (
                            <div className="empty-tasks">

                                <h3>
                                    No tasks yet
                                </h3>

                                <p>
                                    Add your first task
                                    using the form above.
                                </p>

                            </div>
                        )}

                </div>

            </div>

        </div>
    );
}

export default Tasks;