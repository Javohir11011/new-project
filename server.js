import express from "express"
import { userRouter } from "./src/routes/index.js"
import { config } from "dotenv"

config()


const app = express()
app.use(express.json())


app.use("/api/v1/users", userRouter)

const PORT  = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server running ${PORT} port`);
})