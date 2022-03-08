import axios from "axios";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { baseUrl } from "../api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteTask = ({ task, setData, data }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id, e) => {
    e.preventDefault();
    try {
      await axios.delete(`${baseUrl}/${id}`);
      setData(data.filter((d) => d.task_id !== id));
      handleClose();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Button
        color="error"
        size="small"
        variant="contained"
        onClick={handleClickOpen}
        style={{ marginLeft: "7px" }}
      >
        <DeleteForeverIcon
          style={{
            minWidth: "20px",
            minHeight: "20px",
          }}
        />
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative" }}
          style={{ backgroundColor: "red" }}
        >
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
            <Button
              autoFocus
              color="inherit"
              onClick={(e) => handleDelete(task.task_id, e)}
            >
              Confirm
            </Button>
          </Toolbar>
        </AppBar>

        <DialogTitle style={{ textAlign: "center" }}>
          {`Do you really want to delete this task: ${task.tasks}  `}
        </DialogTitle>
      </Dialog>
    </div>
  );
};

export default DeleteTask;
