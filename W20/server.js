const express = require("express");
const mongoose = require("mongoose");
const Employee = require("./models/Employee");
const path = require("path");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/employees")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home with buttons
app.get("/", (req, res) => {
  res.render("index");
});

// View all employees
app.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.render("view", { employees });
});

// Add form
app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  await Employee.create(req.body);
  res.redirect("/employees");
});

// Edit form
app.get("/edit/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.render("edit", { employee });
});

app.post("/edit/:id", async (req, res) => {
  await Employee.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/employees");
});

// Delete
app.get("/delete/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.redirect("/employees");
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
