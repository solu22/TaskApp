import axios from "axios";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { baseUrl } from "../api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditTask = ({ task, setData, data }) => {
  const [tasks, setTasks] = React.useState(task.tasks);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${baseUrl}/${task.task_id}`, { tasks });
      setData(
        data.map((t) => (t.task_id === task.task_id ? { ...t, tasks } : t))
      );
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Button
        color="primary"
        size="small"
        variant="contained"
        onClick={handleClickOpen}
      >
        <ModeEditIcon />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Cancel
            </Typography>
            <Button autoFocus color="inherit" onClick={(e) => updateTask(e)}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <DialogTitle style={{ textAlign: "center" }}>
          Edit Your Task Here
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={`The task to update is ${tasks}`}
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setTasks(e.target.value)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditTask;
