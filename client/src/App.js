import React from "react";
import ListTasks from "./components/ListTasks";
import Container from "@mui/material/Container";
import TaskDetails from "./components/TaskDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <Router>
      <Container>
        <Routes>
          <Route exact path="/" element={<ListTasks />} />
          <Route exact path="/:id" element={<TaskDetails />} />
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
