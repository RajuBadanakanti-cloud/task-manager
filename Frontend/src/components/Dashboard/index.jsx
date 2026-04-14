import axios from "axios"
import { useContext, useState } from "react";
import { CheckCircle, Circle, Pencil, Trash2 } from "lucide-react";
import UserContext from "../../context/userContext";
import AddTask from "../AddTask";
import UpdateTask from "../UpdateTask";

const Dashboard = () => {

const { taskList, setTaskList, loading, error } = useContext(UserContext)
const [isAdding, setIsAdding] = useState(false) // open and close add task page
const [isUpdating, setIsUpdating] = useState(false) // open and close update task page
const [updatingData, setUpdatingData] = useState({}) // data for updating task (completed/incompleted)
const [searchValue, setSearchValue] = useState("") // search value for search task

// Seach Task >>
const searchedTaskList = taskList.filter((e) => e.title.toLowerCase().includes(searchValue.toLowerCase()))



// update Task Complete Status >>
    const updateCompleteStatus = async (taskId, currentStatus) => {

        try {

            const URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

            const response = await axios.patch(
                `${URL}/tasks/${taskId}`,
                { completed: !currentStatus }
            )

            const updatedTask = response.data.task

            setTaskList((prevTasks) =>
                prevTasks.map((eachTask) =>
                    eachTask.id === taskId
                        ? { ...eachTask, completed: updatedTask.completed }
                        : eachTask
                )
            )

        } catch (err) {
            console.log(err)
        }
    }


// delete Task >>
const deleteTask = async (taskId) => {

    try {
 
        const URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

        await axios.delete(`${URL}/tasks/${taskId}`)

        setTaskList((prevTasks) =>
            prevTasks.filter((task) => task.id !== taskId)
        )

    } catch (err) {
        console.log(err)
    }
}


        return (
            <div className="min-h-screen w-screen bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900
            flex flex-col justify-start items-center p-5">

            <h1 className="text-white font-sans font-bold text-xl md:text-2xl mt-10 mb-5">Daily Task Manager</h1>
            
            <div className="p-2 md:p-5 w-full md:w-[70%] flex flex-col justify-start items-center">
                {/*  Search Bar */}
                <input id="searchBar" type="search" value={searchValue} placeholder="search your task" onChange={(event) =>  setSearchValue(event.target.value)}
                className="w-full bg-indigo-900/60 border border-indigo-700 rounded-xl px-4 py-3 text-white placeholder-indigo-400 
                focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                
                {/*  Add Task Button */}
                <button type="button" onClick={() => setIsAdding(true)}
                className="mr-auto h-12 w-full md:w-1/4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-xl shadow-indigo-600/40 font-bold ounded-xl mt-10 md:mb-3 mb-2 ">
                  Add Task 
                </button>
                <p className="text-red-500 text-sm mr-auto">{error}</p>

                
                { loading ? (<p className="text-gray-300 animate-pulse text-base md:text-xl mt-10 md:mt-10">Loading..</p>) :
                
                searchedTaskList.length === 0 ? (<p className="text-gray-400 text-base md:text-xl mt-10 md:mt-10">No Tasks</p>) : 

                (<ul className="w-full mt-5 grid grid-cols-1 gap-4">
                {searchedTaskList .map((each) => {

                    const createdAt = new Date(each.createdAt) 
                    const date = createdAt.toLocaleDateString() // convert to date string
                    const time = createdAt.toLocaleTimeString() // convert to time string

                return (
                <li key={each.id}
                className={`bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-4 md:p-6 border-l-8 ${each.completed ? 'border-green-500' : 'border-indigo-500'} px-4 md:px-6`}>

                    <div className="w-full flex flex-row justify-between items-center flex-wrap gap-y-4">
                    <section className="flex flex-row justify-start items-center flex-wrap mr-4 md:mr-5">

                        {/* Update Complete Status */}
                        <button type="button" className="text-xl text-indigo-400 mr-3 md:mr-6 flex-1 hover:text-indigo-500"
                        onClick={() => updateCompleteStatus(each.id, each.completed)}>
                        {each.completed ? <CheckCircle className="h-4 w-4 md:h-5 md:w-5 shadow-md" /> : < Circle className="h-4 w-4 md:h-5 md:w-5" />}
                        </button>

                        <h2 className={`text-blue-50 font-sans flex-wrap font-bold text-lg md:text-xl ${each.completed ? "line-through opacity-50" : ""}`}>
                        {each.title} </h2>

                </section>

                    {/* Update and Delete */}
                    <section className="flex flex-row justify-start items-center">

                            <button type="button" className="mr-4 md:mr-5" onClick={() => (setIsUpdating(true), setUpdatingData({ id: each.id, title: each.title, completed: each.completed }))}>
                              <Pencil className="h-4 w-4 md:h-5 md:w-5 text-blue-500 hover:text-blue-600 cursor-pointer"/>
                            </button>

                            <button type="button" onClick={() => deleteTask(each.id)}>
                            <Trash2 className="h-4 w-4 md:h-5 md:w-5 text-red-500 hover:text-red-600 cursor-pointer"/>
                            </button>
                    </section>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 mt-2">
                      {date} at {time}
                    </p>

                </li>
            )})}

               </ul>)
                
            
            
            }


            </div>

            {isAdding && <AddTask setIsAdding={setIsAdding} />}
            {isUpdating && <UpdateTask setIsUpdating={setIsUpdating} updatingData={updatingData}/>}

        </div> 
    )
}

export default Dashboard