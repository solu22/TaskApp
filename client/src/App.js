import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListTasks from "./components/ListTasks";
import TaskDetails from "./components/TaskDetails";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    
      <Router>
        <Routes>
          <Route exact path="/" element={<ListTasks />} />
          <Route exact path="/:id" element={<TaskDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    
  );
};

export default App;
