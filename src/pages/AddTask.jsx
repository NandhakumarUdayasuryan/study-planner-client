import React, { useContext, useReducer } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AlertContext } from "../contexts/AlertContext.jsx";
import { APIEndpoints } from "../utils/Constants.js"
import formReducer from "../utils/formReducer.js";

const AddTask = () => {
    const initialState = {
        title: '',
        dueDate: '',
        priority: '',
        action: ''
    };
    const [formState, dispatch] = useReducer(formReducer, initialState);

    const handleChange = (e) => {
        dispatch({
        type: 'UPDATE_FIELD',
        field: e.target.name,
        value: e.target.value,
        });
    };
    
    const { setAlertMessage } = useContext(AlertContext);

    const navigate = useNavigate();

    const addTask = (newTask) => {
        // This function would typically send the new task to your backend or state management
        console.log("Task added:", newTask);
        // Post the tasks
        axios.post(APIEndpoints.TASKS, newTask)
        .then(response => {
            console.log("Task posted to backend:", response.data);
            // Here you would typically send the new task to your backend or state management
            resetTaskForm();
            if (formReducer.action === "move") {
                // Redirect to another page
                navigate("/");
                setAlertMessage({message:`Task(${formState.title})added successfully!`, type: "success"});
            } else if (formReducer.action === "stay") {
                setAlertMessage({message:`Task(${formState.title})added successfully! You can continue adding more tasks.`, type: "success"});
            }
        })
        .catch(error => {
            console.error("Error posting task:", error);
            setAlertMessage({message: "Failed to add task to server.", type: "error"});
        });
    };
    const resetTaskForm = () => {
        // For now, we'll just reset the form
        dispatch({ type: 'RESET', initialState });
    };

    const handleSubmit = (e) => {
        console.log("formState:", formState);
        e.preventDefault(); // prevent page reload
        if (!formState.title || !formState.dueDate || !formState.priority) {
            setAlertMessage({message:"Please fill all the fields.", type: "error"});
            // You can also show an alert or some UI feedback here
            return;
        }

        const userId = JSON.parse(localStorage.getItem('authUser')).id;
        const newTask = {
            title: formState.title,
            due_date: formState.dueDate,
            priority: formState.priority,
            user_id: userId
        };

        console.log("New Task Added:", newTask);
        addTask(newTask);
    };
    return (
        <div className="p-6 shadow-md rounded-lg mx-auto max-w-7xl mt-8">
            <h2 className="text-2xl font-bold mb-8">Add New Task</h2>
            <div className="mb-4 p-3 max-w-6/12 text-center mx-auto bg-green-200 text-gray-700 rounded-lg shadow-md hidden">
                <p className="text-lg font-semibold">
                    Task added successfullly!.
                </p>
                <p className="text-sm">
                    You can now view your task in the dashboard.
                </p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label
                        htmlFor="task-desc"
                        className="block text-sm font-medium text-gray-200"
                    >
                        Title
                    </label>
                    <input
                        id="task-desc"
                        type="text"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        className="mt-1 block w-full outline-0 border-gray-300 pl-1 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter Title"
                    />
                </div>
                <div>
                    <label
                        htmlFor="due-date"
                        className="block text-sm font-medium text-gray-200"
                    >
                        Due Date
                    </label>
                    <input
                        id="due-date"
                        type="date"
                        name="dueDate"
                        value={formState.dueDate}
                        onChange={handleChange}
                        className={`mt-1 inline-block outline-0 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                            formReducer.dueDate ? "" : "contrast-10"
                        }`}
                    />
                </div>
                <div>
                    <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-gray-200"
                    >
                        Priority
                    </label>
                    <select
                        id="priority"
                        value={formState.priority}
                        name="priority"
                        onChange={handleChange}
                        className={`mt-1 outline-0 block pr-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 placeholder:text-green-300 ${
                            formReducer.priority ? "" : "text-gray-600"
                        }`}
                    >
                        <option value="" disabled>
                            Select Priority
                        </option>
                        <option value="3">High</option>
                        <option value="2">Medium</option>
                        <option value="1">Low</option>
                    </select>
                </div>
                <div className="mt-10 border-gray-500 border-t-1 pt-10 flex gap-4">
                    <Link to="/">
                        <button
                            type="submit"
                            className="w-full whitespace-nowrap bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </Link>
                    <button
                        type="submit"
                        name="action"
                        value="move"
                        onClick={handleChange}
                        className="w-full whitespace-nowrap bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Task
                    </button>
                    <button
                        type="submit"
                        name="action"
                        value="stay"
                        onClick={handleChange}
                        className="w-full whitespace-nowrap bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        Add and Continue
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
