import Tasks from "../data/Tasks.js"
import {v4 as uuidv4} from "uuid"


export const getAllTasks = (req, res, next) => {
    try{
        const taskList = Tasks
        res.status(200).json({
            success:true,
            message:"All Tasks",
            tasks:taskList
        })
    }catch(err){
        next(err)
    }
}

export const createATask = async(req, res, next) => {
    try{
        const {title, completed, createdAt} = req.body
        if(!title){
            return res.status(400).json({
                success:false,
                message:"title required!"
            })
        }

        const newData = {
            id:uuidv4(),
            title:title,
            completed:completed,
            createdAt:createdAt || new Date().toISOString()

        } // just demo testing

        Tasks.push(newData)
        res.status(201).json({
            success:true,
            message:"Task Created",
            task:newData
        })
    }catch(err){
        next(err)
    }
}


export const updateTask = async (req, res, next) => {
    try{
        const {id} = req.params
        const {title, completed, createdAt} = req.body
        const task = Tasks.find((e) => e.id === id)

        if(!task){
           return res.status(404).json({
                message:"Task Not Found!",
            })
        }

        if(title !== undefined){
            task.title = title
        }

        if(completed !== undefined){
            task.completed = completed
        }

        if(createdAt !== undefined){
            task.createdAt = createdAt
        }

        res.status(200).json({
            success:true,
            message:"Task Updated",
            task:task
        })

    }catch(err){
        next(err)
    }
      
}


export const deleteTask = async (req, res, next) => {
    try{
        const {id} = req.params 
        const index = Tasks.findIndex((e) => e.id === id)
        if(index === -1){
            return res.status(404).json({
                success:"false",
                message:"Task Not Found!",
            })
        }

        const deletedTask = Tasks.splice(index, 1)[0]

        res.status(200).json({
            success:true,
            message:"Task Deleted",
            task:deletedTask
        })
        
    }catch(err){
        next(err)
    }
}