import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

function Create({ onTaskAdded }) {
    const [task, setTask] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("https://backend-9p1z.onrender.com/todo/add", { task },{ withCredentials: true });
            setMessage(res.data.message);
            setError("");
            setTask("");

            //Call parent function to instantly show new task
            onTaskAdded(res.data.data);

            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            const errMsg = err.response?.data?.message || "Something went wrong";
            setError(errMsg);
            setMessage("");
            setTimeout(() => setError(""), 3000);
        }
    };

    return (
        <>
            <form
                onSubmit={handleAdd}
                className="flex items-center justify-center mt-8 w-full">
                <input
                    type="text"
                    placeholder="Enter a task..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="border-2 border-zinc-300 rounded-lg px-4 py-2 w-72 focus:outline-none focus:border-blue-500 transition-all duration-300 shadow-sm placeholder-gray-400"
                />
                <button
                    type="submit"
                    className="ml-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md"
                >
                    Add
                </button>
            </form>

            {message && (
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-5 py-3 rounded-lg shadow-lg z-50"
                >
                    ✅ {message}
                </motion.div>
            )}

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-5 py-3 rounded-lg shadow-lg z-50"
                >
                    ❌ {error}
                </motion.div>
            )}
        </>
    );
}

export default Create;
