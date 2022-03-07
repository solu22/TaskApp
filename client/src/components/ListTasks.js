

import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../api";
import SingleTask from "./SingleTask";
import { useDrag, useDrop } from "react-dnd";
//import { Container, Stack } from "@mui/material";
import { Container, Grid, ListItem, Typography, Paper } from "@mui/material";
//import { Stack } from "@mui/material"
import List from "@mui/material/List";
//import { Box } from "@mui/system";
import ListItemText from "@mui/material/ListItemText";
//import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InputTask from "./InputTask";
import Divider from "@mui/material/Divider";
import Loader from './Loader'


const ListTasks = () => {
  const [data, setData] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(baseUrl);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTasks();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);

   const [{ isOver }, addToCompletedTaskRef] = useDrop({
     accept: "current_task",
     collect: (monitor) => ({
       isOver: !!monitor.isOver(),
     }),
   });

   const [{ isOver: isTaskOver }, removeFromCompletedTaskRef] = useDrop({
     accept: "completed_task",
     collect: (monitor) => ({
       isOver: !!monitor.isOver(),
     }),
   });

   const moveCurrentToCompleted = (task) => {
     setData((prev) => prev.filter((_, i) => i !== task.index));
     setCompletedTask((prev) => [...prev, task]);
   };

   const removeFromCompleted = (task) => {
     setCompletedTask((prev) => prev.filter((_, i) => i !== task.index));
     setData((prev) => [...prev, task]);
   };
   


  return (
    <Container>
      <InputTask />
      <Grid
        container
        justifyContent="space-between"
        style={{ marginTop: "5%" }}
      >
        <Grid
          style={{ backgroundColor: "#9F1E49" }}
          item
          xs={12}
          md={6}
          lg={6}
          ref={removeFromCompletedTaskRef}
        >
          <Typography variant="h6" color="white" textAlign="center">
            <Loader /> Active Task
          </Typography>
          <List>
            {data?.map((task, i) => (
              <SingleTask
                task={task}
                key={task.task_id}
                data={data}
                setData={setData}
                onDropTask={moveCurrentToCompleted}
                type="current_task"
                index={i}
              />
            ))}
          </List>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={6}
          style={{ backgroundColor: "#019267" }}
          ref={addToCompletedTaskRef}
        >
          <Typography
            variant="h6"
            color="white"
            textAlign="center"
            marginTop="45px"
          >
            Completed Task
          </Typography>
          <List>
            {completedTask?.map((task, i) => (
              <SingleTask
                task={task}
                key={task.task_id}
                data={data}
                setData={setCompletedTask}
                index={i}
                type="completed_task"
                onDropTask={removeFromCompleted}
              />
            ))}
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListTasks;
