import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDrop } from "react-dnd";
import { Container, Grid, Typography } from "@mui/material";
import List from "@mui/material/List";
import InputTask from "./InputTask";
import Loader from "./Loader";
import { baseUrl } from "../api";
import SingleTask from "./SingleTask";

const ListTasks = () => {
  const [data, setData] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({});
  const [ message, setMessage] = useState(null)
  
    const fetchTasks = async () => {
      try {
        const response = await axios.get(baseUrl);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const cleanUpFunc = () =>{
      setState({
        name:'for-clean-up'
      })
    }

  useEffect(() => {
  
    fetchTasks();
    cleanUpFunc()
    return ()=>{ setState({})}
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


// eslint-disable-next-line no-unused-vars
  const [{ isOver }, addToCompletedTaskRef] = useDrop({
    accept: "current_task",
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // eslint-disable-next-line no-unused-vars
  const [{ isOver: isTaskOver }, removeFromCompletedTaskRef] = useDrop({
    accept: "completed_task",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const moveCurrentToCompleted = (task) => {
    setData((prev) => prev.filter((_, i) => i !== task.index));
    setCompletedTask((prev) => [...prev, task]);
    setMessage('Congratulations !! All task done')
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
        justifyContent="center"
        style={{ marginTop: "5%", gap: 15 }}
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
            <p>{data.length === 0 && message}</p>
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
          xs
          style={{ backgroundColor: "#019267" }}
          ref={addToCompletedTaskRef}
        >
          <Typography
            variant="h6"
            color="white"
            textAlign="center"
            marginTop="50px"
          >
            Completed Task
          </Typography>
          <List>
            {completedTask?.map((task, i) => (
              <SingleTask
                task={task}
                key={task.task_id}
                data={data}
                setData={setData}
                setCompletedTask={setCompletedTask}
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
