import { useEffect, useState } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {

    const [taskList, setTaskList] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")



    useEffect(() => {

        const debounce =  setTimeout(() => {
            const getTasksData = async () => {
            try {

                setLoading(true)

                const URL = import.meta.env.VITE_API_URL || "http://localhost:5000"
              
                const response = await axios.get(`${URL}/tasks`)
                const data = response.data.tasks
                setTaskList(data ?? [])
                
            } catch (err) {
                console.log(err)
                setError("Network error, Please try again later!.")
            } finally {
                setLoading(false)
            }
        } 
          getTasksData()   
        }, 500);

        return () => clearTimeout(debounce)


    }, [])


    return (
        <UserContext.Provider value={{ taskList, setTaskList, loading, error }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider