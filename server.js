const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/auth-route");
const cors =require('cors')
// const connectDb = require('./utils/db');
const app = express();
const PORT = 3001;

mongoose.connect("mongodb://0.0.0.0:27017/bolgapp");
app.use(express.json());
app.use(cors());
app.use("/api/auth", router);

app.listen(PORT);

