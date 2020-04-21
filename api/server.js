const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const usersRouter = require("../users/user-router.js");
const registerRouter = require("../auth/register-router.js");
const loginRouter = require("../auth/login-router.js");
const logoutRouter = require("../auth/logout-router.js");
const authenticator = require("../auth/authenticator.js");

const server = express();

const sessionConfig = {
  name: "monster",
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  cookie: {
    maxAge: 1000 * 60,
    secure: process.env.USE_SECURE_COOKIES || false, // used over https only, set to true in production
    httpOnly: true, // true means JS on the client cannot access the cookie
  },
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

server.use("/api/register", registerRouter);
server.use("/api/login", loginRouter);
server.use("/api/logout", logoutRouter);
server.use("/api/users", authenticator, usersRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
