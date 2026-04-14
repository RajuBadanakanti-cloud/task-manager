import express from "express"
import { createATask, deleteTask, getAllTasks, updateTask } from "../controllers/tasksContollers.js"

const routes = express.Router()

routes.route("/").get(getAllTasks)
routes.route("/").post(createATask)
routes.route("/:id").patch(updateTask)
routes.route("/:id").delete(deleteTask)

export default routes