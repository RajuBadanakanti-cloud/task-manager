import { useEffect, useState } from "react";
import UserContext from "./userContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {

    const [taskList, setTaskList] = useState([])
    const [error, setError] = useState("")



    useEffect(() => {

        const debounce =  setTimeout(() => {
            const getTasksData = async () => {
            try {

          
                const url = "http://localhost:5000/tasks"
                const response = await axios.get(url)
                const data = response.data.tasks
                setTaskList(data ?? [])
                
            } catch (err) {
                console.log(err)
                setError("Network error, Please try again later!.")
            } 
        } 
          getTasksData()   
        }, 1000);

        return () => clearTimeout(debounce)


    }, [])


    return (
        <UserContext.Provider value={{ taskList, setTaskList,error }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider