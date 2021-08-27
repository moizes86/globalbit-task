const express = require("express");
const app = express();
const cors = require("cors");
const port = 3100;

const { DB } = require("./db");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/register", async (req, res) => {
  const result = await DB.register(req.body);
  res.status(200).send(result);
});

app.post("/login", async (req, res) => {
  const result = await DB.login(req.body)
  res.status(200).send(result);
});

app.listen(port, () => console.log("Server is running on port ", port));
