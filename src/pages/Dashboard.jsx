import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import Shimmer from "../components/Shimmer";
import {
    APIEndpoints,
    PRIORITY_VALUES,
    STATUS_VALUES,
} from "../utils/Constants.js";

const Dashboard = () => {
    const [allTasks, setAllTasks] = useState([]);
    let [todayTasks, setTodayTasks] = useState([]);
    let [previousTasks, setPreviousTasks] = useState([]);
    let [upcommingTasks, setUpcommingTasks] = useState([]);
    let [completedTasks, setCompletedTasks] = useState([]);
    let [isFetched, setIsFetched] = useState(false);

    const userId = JSON.parse(localStorage.getItem("authUser")).id;

    useEffect(() => {
        // todo
        axios.get(`${APIEndpoints.TASKS}/${userId}`).then((res) => {
            setAllTasks(res.data);
            setIsFetched(true);
        });
    }, []);

    useEffect(() => {
        if (!allTasks || !allTasks.length) {
            setTodayTasks([]);
            setPreviousTasks([]);
            setUpcommingTasks([]);
            setCompletedTasks([]);
            return;
        }

        const todayDate = new Date().toISOString().split("T")[0];
        const today = [];
        const previous = [];
        const upcoming = [];
        const completed = [];

        // Sort by due_date (asc), then by priority (desc: High to Low) and then status (order: inprogress, pending, on hold, complete)
        const sortedTasks = allTasks.sort((a, b) => {
            if (a.due_date !== b.due_date) {
                return new Date(a.due_date) - new Date(b.due_date);
            }
            if (PRIORITY_VALUES[a.priority] !== PRIORITY_VALUES[b.priority]) {
                return (
                    PRIORITY_VALUES[b.priority] - PRIORITY_VALUES[a.priority]
                );
            }
            return STATUS_VALUES[b.status] - STATUS_VALUES[a.status];
        });
        // Distribute tasks into respective arrays based on their status and due_date

        sortedTasks.forEach((task) => {
            if (task.status === "Done") {
                completed.push(task);
            } else if (task.due_date === todayDate) {
                today.push(task);
            } else if (task.due_date < todayDate) {
                previous.push(task);
            } else if (task.due_date > todayDate) {
                upcoming.push(task);
            }
        });

        setTodayTasks(today);
        setPreviousTasks(previous);
        setUpcommingTasks(upcoming);
        setCompletedTasks(completed);
    }, [allTasks]);

    if (!allTasks.length && isFetched) {
        return (
            <div className="p-6 shadow-md rounded-lg mx-auto max-w-7xl mt-8">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome to your Dashboard!
                </h1>
                <p className="mb-4">
                    You currently have no tasks or activities. Start by adding a
                    new task.
                </p>
                <Link
                    to="/add-task"
                    className="bg-green-700 text-sm text-white px-4 py-3 font rounded hover:opacity-90 align-middle"
                >
                    <span className="text-3xl pr-3 font-light inline-block align-sub">
                        +
                    </span>
                    <span className="inline-block align-baseline">
                        Add Task
                    </span>
                </Link>
            </div>
        );
    }
    if (!allTasks.length) {
        return <Shimmer />;
    }
    return (
        <div className="p-6 shadow-md rounded-lg mx-auto max-w-7xl mt-8">
            <div className="flex justify-between items-center text-2xl font-bold mb-4">
                <h1 className="uppercase">Dashboard</h1>
                <Link
                    to="/add-task"
                    className="bg-green-700 text-sm text-white px-4 py-1 pt-0 font rounded hover:opacity-90 align-middle"
                >
                    <span className="text-3xl pr-3 font-light inline-block align-sub">
                        +
                    </span>
                    <span className="inline-block align-baseline">
                        Add Task
                    </span>
                </Link>
            </div>
            <p className="mb-8 pl-6">
                Here you can manage your tasks and study materials.
            </p>
            <TaskCard
                title="Today Tasks"
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                tasks={todayTasks}
                setTasks={setTodayTasks}
            />
            <TaskCard
                title="Previous days Tasks"
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                tasks={previousTasks}
                setTasks={setPreviousTasks}
            />
            <TaskCard
                title="Upcomming days Tasks"
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                tasks={upcommingTasks}
                setTasks={setUpcommingTasks}
            />
            <TaskCard
                title="Completed Tasks"
                allTasks={allTasks}
                setAllTasks={setAllTasks}
                tasks={completedTasks}
                setTasks={setCompletedTasks}
            />
        </div>
    );
};

export default Dashboard;
