import express from "express"
import dotenv from "dotenv"
dotenv.config()
import helmet from "helmet"
import cors from "cors"

import tasksRoutes from "./routes/tasksRoutes.js"
import errorMiddleware from "./middleware/errorMid.js"
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const app = express()
app.use(helmet())
app.use(cors({
    origin:[process.env.FRONTEND_URL, "http://localhost:5173"]
}))

app.use(express.json())
app.use("/tasks", tasksRoutes) // tasks >>

app.get("/", (req, res, next) => {
    res.send("<h1>Task Manger Server Runnig</h1>")
})

app.use(errorMiddleware)

export default app