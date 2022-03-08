import axios from "axios";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";

import React, { useState } from "react";
import { baseUrl } from "../api";
import { Button, Typography } from "@mui/material";

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
      <Typography fontFamily="cursive" variant="h3" mb={6}>
        Task App
      </Typography>

      <Box component="form" noValidate autoComplete="off" textAlign="center">
        <FormControl sx={{ width: "35ch" }}>
          <OutlinedInput
            placeholder="Enter a task to assign and do drag and drop"
            type="text"
            value={task}
            className="form-control"
            onChange={(e) => setTask(e.target.value)}
          />
          <br></br>
          <Button
            type="submit"
            onClick={addTask}
            variant="contained"
            color="success"
          >
            Add Task
          </Button>
        </FormControl>
      </Box>
    </>
  );
};

export default InputTask;
