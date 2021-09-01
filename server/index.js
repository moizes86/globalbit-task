const express = require("express");
const cors = require("cors");
const { emailer } = require("./emailer");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");

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
  try {
    const result = await DB.register(req.body);
    return res.status(200).json("Registration Successful");
  } catch (err) {
    if (err.errno === 1062)
      return res.status(403).json({ message: "Email already exists. Try another one." });
    return res.status(403).json({ message: "Registration error. Try again later." });
  }
});

app.post("/login", async (req, res) => {
  const randomCode = Math.floor(Math.random() * 100000);
  req.body.code = randomCode;
  try {
    await DB.login(req.body);
    await DB.insertCode(req.body.email, randomCode);
    await emailer(req.body.email, randomCode).catch(console.error);
    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/verify", async (req, res) => {
  try {
    await DB.verify(req.body);
    const accessToken = jwt.sign({ email: req.body.email }, "verificationKey");

    return res.status(200).json({ message: "Login successful", accessToken });
  } catch (err) {
    return res.status(400).json({ message: err.message ?? "Error validating account. Try again later." });
  }
});

const verifyWithJwtBeforeUsersDisplay = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "verificationKey", (err, data) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.data = data;
      next();
    });
  } else {
    return res.status(401).json({ message: "Not authenticated" });
  }
};

app.get("/display-users", verifyWithJwtBeforeUsersDisplay, async (req, res) => {
  const result = await DB.getUsersToDisplay();
  return res.status(200).send(result);
});

app.listen(port, () => console.log("Server is running on port ", port));
