import React from "react";
import { useDrag } from "react-dnd";

import { ListItem} from "@mui/material";

import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Divider } from "@mui/material";



const SingleTask = ({ task, data, setData,index,type,onDropTask }) => {

const [{ isDraggable}, dragRef] = useDrag({
  type: type,
  item: ()=>({...task, index}),

  end: (item, monitor)=>{
    const dropResult = monitor.getDropResult()

    if(item && dropResult){
      onDropTask(item)
    }
  },
  collect:(monitor)=>({
    isDragging: monitor.isDragging(),
  }),
});


  return (
    <>
      <ListItem ref={dragRef}>
        <ListItemText
          primary={task.tasks}
          style={{
            textAlign: "left",
            color: "#EEEEEE",
            border: "1px solid",
            padding: "10px",
            boxShadow: "5px 10px 20px ",
            marginBottom: "10px",
            marginLeft: "10px",
          }}
        />

        <IconButton>
          <EditTask task={task} setData={setData} data={data} />
          <DeleteTask task={task} setData={setData} data={data} />
        </IconButton>
      </ListItem>
      <Divider style={{ borderRadius: "5px", border: "3px solid #bbb" }} />
    </>

    //   style={{ minWidth: "100px" }}
    //   secondaryAction={
    //     <>
    //       <IconButton >
    //         <EditTask task={task} setData={setData} data={data} />
    //       </IconButton>
    //       <IconButton >
    //         <DeleteTask task={task} setData={setData} data={data} />
    //       </IconButton>
    //     </>
    //   }
    // >
    //   <ListItemText
    //     primary={task.tasks}
    //     style={{
    //       textAlign: "left",
    //       color: "black",
    //       border: "1px solid",
    //       padding: "20px",
    //       boxShadow: "5px 10px 20px grey inset",
    //       marginBottom: "10px",

    //     }}
    //   />
    // </ListItem>
    // <div className="card  text-white single__task" ref= {dragRef}>
    //   <img
    //     src={`${background}`}
    //     className="card-img"
    //     alt="mohko"
    //    style={{ width: "300px" }}
    //   />
    //   <div className="card-img-overlay">
    //     <h5
    //       className="card-title"
    //       style={{ marginBottom: "40px", marginTop: "30px" }}
    //     >
    //       {task.tasks}
    //     </h5>
    //     <span className="icon">
    //       <EditTask task={task} setData={setData} data={data} />
    //     </span>
    //     <span className="icon">
    //       <DeleteTask task={task} setData={setData} data={data} />
    //     </span>
    //   </div>
    // </div>
  );
};
export default SingleTask;



