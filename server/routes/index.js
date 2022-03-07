const express = require("express");
const pool = require("../config");
const taskRouter = express.Router()


//create tasks
taskRouter.post("/", async (req, res) => {
  try {
    const { tasks } = req.body;
    const newTask = await pool.query(
      "INSERT INTO tasktable (tasks) VALUES($1) RETURNING *",
      [tasks]
    );
    res.json(newTask.rows);
  } catch (error) {
    console.log(error.message);
  }
});


//get all tasks
taskRouter.get("/", async(req, res)=>{
    try {
        const fetchTasks = await pool.query("SELECT * FROM tasktable");
        res.json(fetchTasks.rows)
    } catch (error) {
        console.log(error)
    }
})

//get single task

taskRouter.get("/:id", async(req, res)=>{
    try {
        const { id } = req.params
        const fetchSingleTask = await pool.query("SELECT *  FROM tasktable WHERE task_id =  $1",[id])
        res.json(fetchSingleTask.rows[0])
    } catch (error) {
        console.log(error.message)
    }
})


//update tasks

taskRouter.put("/:id", async(req, res)=>{
    try {
        const { id } = req.params;
        const { tasks } = req.body;
        const updateTask = await pool.query("UPDATE tasktable SET tasks = $1 WHERE task_id = $2",[tasks, id])
        res.json("Task is updated")
    } catch (error) {
        console.log(error.message)
    }

})

//delete tasks

taskRouter.delete("/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const deleteTask = await pool.query(" DELETE FROM tasktable WHERE task_id = $1", [id]);
        res.json("successfully deleted selected tasks")
    } catch (error) {
        console.log(error.message)
    }
})


module.exports = taskRouter