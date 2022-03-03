require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const pool = require("./config")

//middleware
app.use(cors());
app.use(express.json())


/* Routes */
app.post("/tasks", async (req, res)=>{
   try {
       const { tasks } = req.body;
       const newTask = await pool.query("INSERT INTO tasktable (tasks) VALUES($1) RETURNING *", [tasks]);
       res.json(newTask.rows[0]);

   } catch (error) {
    console.log(error.message)
   }
})
//create tasks



//get all tasks

//update tasks

//delete tasks

app.get('/', (req, res)=>{
    res.send('Hello backend')
})

const port = process.env.PORT

app.listen (port, ()=> console.log(`Server listening at port ${port}`))