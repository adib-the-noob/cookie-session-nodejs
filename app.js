const express = require("express");
const cookieParser = require("cookie-parser");

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(cookieParser());

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.post("/login", (req, res) => {
  const { username, password } = req.body;
  res.cookie("username", username, { maxAge: 900000, httpOnly: true });
  res.json({ message: "Login successful" });
});
