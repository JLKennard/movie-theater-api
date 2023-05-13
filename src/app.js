const express = require("express");
const app = express();
const db = require("../db/connection");
const show = require("../routes/ShowRoute");
const user = require("../routes/UserRoute");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/shows", show);
app.use("/users", user);

module.exports = app;
