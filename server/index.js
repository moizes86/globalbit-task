const express = require("express");
const cors = require("cors");
const { emailer } = require("./emailer");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
const port = 3100;
const { DB } = require("./db");
const { urlencoded } = require("express");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    key: "auth",
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 1000 * 60,
    },
  })
);

app.post("/register", async (req, res) => {
  const result = await DB.register(req.body);
  res.status(200).send(result);
});

app.post("/login", async (req, res) => {
  const randomCode = Math.floor(Math.random() * 100000);
  req.body.code = randomCode;

  const result = await DB.login(req.body);

  if (result.success) {
    await DB.insertCode(req.body.email, randomCode);
    await emailer(req.body.email, randomCode).catch(console.error);
  }

  res.status(200).send(result);
});

app.post("/verify", async (req, res) => {
  const result = await DB.verify(req.body);
  if (result.success) req.session.user = "ok";

  res.status(200).send(result);
});

app.get("/usersToDisplay", async (req, res) => {
  if (req.session.user) {
    const result = await DB.getUsersToDisplay();
    return res.status(200).send(result);
  }

  res.status(200).send({ success: false, payload: "Unauthorized" });
});

app.listen(port, () => console.log("Server is running on port ", port));
