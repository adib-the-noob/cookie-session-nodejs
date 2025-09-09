const express = require("express");
const cookieParser = require("cookie-parser");

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(cookieParser());

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const SessionStorage = {};

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.cookie("username", username, { maxAge: 900000, httpOnly: true });
  SessionStorage[username] = { IsLoggedIn: true };
  res.json({ message: "Login successful" });
});

server.get("/user", (req, res) => {
  const username = req.cookies.username;
  if (!username) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ username });
});

server.get("/protected", (req, res) => {
  const { username } = req.cookies;
  if (SessionStorage[username] && SessionStorage[username].IsLoggedIn) {
    res.json({ message: `Hello, ${username}, you have access to this route!` });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});
