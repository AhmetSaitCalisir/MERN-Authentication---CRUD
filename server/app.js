require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("Api running");
});

const PORT = process.env.PORT || 4545;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});
