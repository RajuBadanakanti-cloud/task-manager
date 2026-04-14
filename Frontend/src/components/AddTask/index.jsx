import axios from "axios"
import { useState, useContext } from "react";
import { LoaderCircle } from "lucide-react";
import UserContext from "../../context/userContext";


const AddTask = ({ setIsAdding }) => {

const { setTaskList } = useContext(UserContext)

const [title, setTitle] = useState("")
const [completeStatus, setCompleteStatus] = useState(false)

const [loading, setLoading] = useState(false)
const [error, setError] = useState("")

const handleAddTask = async (e) => {

            try{
                e.preventDefault()
                setLoading(true)

                const URL = import.meta.env.VITE_API_URL || "http://localhost:5000"
                const url = `${URL}/tasks`
                
                const response = await axios.post(url, {
                    title,
                    completed: completeStatus === "true" ? true : false,
                    createdAt: new Date() // data and time (present)
                })

                const newTask = response.data.task
                // Update Dashboard instantly
                setTaskList((prev) => [...prev, newTask])

            } catch(err){
                console.log(err)
                setError("Failed to add task. Please try again later.")

            } finally{
                setLoading(false)
                setIsAdding(false)
        }

    }



return (

    <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 w-full h-screen fixed top-0 left-0 z-50
    flex justify-center items-center">

        <form id="addTaskForm" onSubmit={handleAddTask}
        className="w-[90%] lg:w-[40%] px-4 md:px-5 py-8  rounded-xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900 shadow-md
        flex flex-col justify-start items-center">

            <h1 className="text-white font-sans font-bold text-xl md:text-2xl mb-5">Add New Task</h1>

            <input id="taskTitle" type="text" required autoFocus value={title} placeholder="Task Title" onChange={(event) => setTitle(event.target.value)}
            className="w-full bg-indigo-900/60 border border-indigo-700 rounded-xl px-4 py-3 text-white placeholder-indigo-400
            focus:outline-none focus:ring-1 focus:ring-indigo-500 mb-4"/>

            <section className="w-full flex flex-col justify-start items-start">

                <label htmlFor="CompleteStatus" className="text-indigo-400 font-sans text-sm md:text-base mb-2">
                Do you complete your task?
                </label>

                <select id="CompleteStatus" value={completeStatus} onChange={(event) => setCompleteStatus(event.target.value)}
                className="w-full bg-indigo-900/60 border border-indigo-700 rounded-xl px-4 py-3 text-white placeholder-indigo-400
                focus:outline-none focus:ring-1 focus:ring-indigo-500 mb-4">
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </section>

            <button type="submit" disabled={loading}
                className="w-full h-12 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-xl shadow-indigo-600/40 font-bold ounded-xl 
                flex justify-center items-center">

                {loading ? (
                <LoaderCircle className="animate-spin"/>
                ) : (
                "Add Task"
                )}
            </button>
            <p className="text-red-500 text-xs md:text-sm">{error}</p>


        </form>

    </div>

)
}

export default AddTask