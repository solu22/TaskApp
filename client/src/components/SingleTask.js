import React from "react";
import { useDrag } from "react-dnd";
import {ListItem, ListItemButton } from "@mui/material";
import { ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { Link } from "react-router-dom";


const SingleTask = ({
  task,
  data,
  setData,
  index,
  type,
  onDropTask
  
}) => {

 

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
      <ListItem ref={dragRef} style={{width:'100%'}}>
        <ListItemButton component = {Link} to = {`/${task.task_id}`} style={{cursor:'pointer'}}>
          <MenuIcon style={{color:'white'}}/>
          <ListItemText
            primary={task.tasks}
            style={{
              textAlign: "left",
              color: "#EEEEEE",
              border: "1px solid black",
              padding: "10px",
              boxShadow: "5px 10px 20px orange ",
              marginBottom: "10px",
              marginLeft: "10px",
              opacity: { opacity },
              
            }}
          />
        </ListItemButton>

        <EditTask task={task} setData={setData} data={data} />
        <DeleteTask task={task} setData={setData} data={data} />
      </ListItem>
    </>
  );
};
export default SingleTask;
