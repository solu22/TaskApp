import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import React from "react";
import { useDrag } from "react-dnd";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { Link } from "react-router-dom";

const SingleTask = ({ task, data, setData, index, type, onDropTask }) => {
  // eslint-disable-next-line no-unused-vars
  const [{ isDragging }, dragRef] = useDrag({
    type: type,
    item: () => ({ ...task, index }),

    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDropTask(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={0}>
        <Grid item xs={12}>
          <Card
            ref={dragRef}
            sx={{ maxWidth: 250 }}
            style={{ padding: "20px" }}
          >
            <CardContent>
              <Typography variant="body" opacity={opacity}>
                <Link
                  to={`/${task.task_id}`}
                  style={{
                    cursor: "pointer",
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <p style={{textAlign:'start'}}>{task.tasks}</p>
                </Link>
              </Typography>
            </CardContent>
            <CardActions style={{ textAlign: "center", marginLeft: "7%" }}>
              <EditTask task={task} setData={setData} data={data} />
              <DeleteTask task={task} setData={setData} data={data} />
            </CardActions>
          </Card>
          <br></br>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleTask;
