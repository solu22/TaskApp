import React from "react";
import InputTask from "./components/InputTask";
import ListTasks from "./components/ListTasks";
import Container from "@mui/material/Container";

const App = () => {
  return (
    <Container>
      <ListTasks />
    </Container>
  );
};

export default App;
