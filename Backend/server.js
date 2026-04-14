import app from "./app.js";

const PORT = process.env.PORT
const HOST  = process.env.HOST 

app.listen(PORT, () => {
    console.log(`Server Runnig at ${HOST}:${PORT}`)
})
