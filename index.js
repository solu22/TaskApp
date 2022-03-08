require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./config");
const taskRouter = require("./routes");

//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
  res.send('hello backend')
})

/* Routes */

app.use("/tasks", taskRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server listening at port ${port}`));
