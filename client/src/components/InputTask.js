
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";



import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../api";
import { Button } from "@mui/material";

const InputTask = () => {
  const [task, setTask] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseUrl, { tasks: task });
      setTask(response.data.tasks);
      window.location = "/";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <h1 style={{ color: "black" }}>Task App</h1>

      <Box component="form" noValidate autoComplete="off" textAlign="center">
        <FormControl sx={{ width: "25ch" }}>
          <OutlinedInput
            placeholder="Enter a task to assign"
            type="text"
            value={task}
            className="form-control"
            onChange={(e) => setTask(e.target.value)}
          /><br></br>
          <Button type="submit" onClick={addTask} variant="contained" color="success">
            Add Task
          </Button>
        </FormControl>
      </Box>

    </>
  );
};

export default InputTask;
