import { useContext } from "react";
import axios from "axios";
import { APIEndpoints } from "../utils/Constants.js"
import { AlertContext } from "../contexts/AlertContext.jsx";

function TaskCard({ allTasks, setAllTasks, tasks, title }) {
    const { setAlertMessage } = useContext(AlertContext);
    const updateField = (fieldValue, fieldName, affectedTask) => {
        // Update fieldName and fieldValue in the task
        const updatedTasks = allTasks.map((task) =>
            task.id === affectedTask.id
            ? { ...task, [fieldName]: fieldValue }
            : task
        );
        
        // Optionally, update on server
        console.log('patch', axios.patch)
        axios
        .patch(`${APIEndpoints.TASKS}/${affectedTask.id}`, {
            fieldName,
            fieldValue
        }).then(() => {
            setAlertMessage({message:`${fieldName.charAt(0).toUpperCase()}${fieldName.slice(1)} of (${affectedTask.title}) updated successfully!`, type: "success"});
            setAllTasks(updatedTasks);
        })
        .catch(() => {
            setAlertMessage({ message: `Failed to update ${fieldName} for (${affectedTask.title})`, type: "error" });
        });
    };

    const deleteTask = (affectedTask) => {
        if (
            window.confirm(
                "Are you sure you want to delete this task? This action cannot be undone."
            )
        ) {
            axios.delete(`${APIEndpoints.TASKS}/${affectedTask.id}`).then(()=> {
                const updatedTasks = allTasks.filter((task) => task.id !== affectedTask.id);
                setAllTasks(updatedTasks);
                setAlertMessage({message:`Task(${affectedTask.task}) deleted successfully!`, type: "success"});
            }).catch((e)=> {
                setAlertMessage({message:`Task(${affectedTask.title}) not able to delete`, type: "error"});
                console.error(e);
            })
        }
    };

    if (!tasks || tasks.length === 0) {
        return (
            <div className="mb-8">
                <h3 className="text-xl font-extrabold uppercase">{title}</h3>
                <p className="text-gray-500 pl-5 py-1">No tasks available.</p>
            </div>
        );
    }
    return (
        <div className="mb-8">
            <h3 className="text-xl font-extrabold uppercase">{title}</h3>
            {/* Placeholder for upcoming tasks */}
            <ul className="list-disc pl-5">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="py-1 flex justify-between items-center"
                    >
                        <div className="text-gray-200">
                            <span className="">
                                {`${task.title} (Due: ${new Date(
                                    task.due_date
                                ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                        )`}
                            </span>
                        </div>
                        <div className="ml-2 text-gray-400">
                            <span className="mr-3 text-gray-400">
                                <span>Priority: </span>
                                <select
                                    value={task.priority}
                                    onChange={(e) =>
                                        updateField(
                                            e.target.value,
                                            "priority",
                                            task
                                        )
                                    }
                                    className="ml-2 bg-gray-600 text-gray-100 rounded px-1 py-1 cursor-pointer hover:opacity-85"
                                    title="Update Task Priority"
                                    aria-label="Update Task Priority"
                                >
                                    <option value="1">Low</option>
                                    <option value="2">Medium</option>
                                    <option value="3">High</option>
                                </select>
                            </span>
                            <span>Status: </span>
                            <select
                                value={task.status}
                                onChange={(e) =>
                                    updateField(
                                        e.target.value,
                                        "status",
                                        task
                                    )
                                }
                                className="ml-2 bg-gray-600 text-gray-100 rounded px-1 py-1 cursor-pointer hover:opacity-85"
                                title="Update Task Status"
                                aria-label="Update Task Status"
                            >
                                <option value="Done">Done</option>
                                <option value="In Progress">In Progress</option>
                                <option value="To Do">To Do</option>
                            </select>
                            <button
                                className="ml-3 bg-pink-900 text-gray-200 px-2 py-1 rounded hover:opacity-90 cursor-pointer"
                                onClick={() => deleteTask(task)}
                                title="Delete Task"
                                aria-label="Delete Task"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

import PropTypes from "prop-types";

TaskCard.propTypes = {
    allTasks: PropTypes.array.isRequired,
    setAllTasks: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

export default TaskCard;
