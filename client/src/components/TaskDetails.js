import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../api";

const TaskDetails = () => {
  const [task, setTask] = useState("");
  const { id } = useParams();

  const fetchTaskDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      const data = await response.data;
      let date = new Date().toDateString();
      const newObj = { ...data, date };
      setTask(newObj);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchTaskDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task]);

  return (
    <Card
      style={{
        margin: "20% 0 0 10%",
        width: "70%",
        textAlign: "center",
        backgroundColor: "#3DB2FF",
        color: "whitesmoke",
        height: "40vh",
      }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Your Task Details:
        </Typography>

        <Typography sx={{ mb: 1.5 }}>Task Id: {task.task_id}</Typography>
        <Typography variant="body2">
          Task: {task.tasks}
          <br />
          Visited: {task.date}
        </Typography>
      </CardContent>
      <br></br>

      <Button size="large" href="/" color="success" variant="contained">
        HOME
      </Button>
    </Card>
  );
};

export default TaskDetails;
