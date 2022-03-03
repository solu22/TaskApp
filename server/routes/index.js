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
    res.json(newTask.rows[0]);
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
        const fetchSingleTask = await pool.query(`SELECT *  FROM tasktable WHERE task_id = ${id}`)
        res.json(fetchSingleTask.rows)
    } catch (error) {
        console.log(error.message)
    }
})


//update tasks

//delete tasks


module.exports = taskRouter