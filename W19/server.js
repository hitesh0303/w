const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/Student");
const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/student")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Connection error", err));

const sampleData = [
  {
    Name: "ABC",
    Roll_No: 111,
    WAD_Marks: 25,
    CC_Marks: 25,
    DSBDA_Marks: 25,
    CNS_Marks: 25,
    AI_Marks: 25,
  },
  {
    Name: "XYZ",
    Roll_No: 112,
    WAD_Marks: 30,
    CC_Marks: 28,
    DSBDA_Marks: 32,
    CNS_Marks: 29,
    AI_Marks: 30,
  },
  {
    Name: "DEF",
    Roll_No: 113,
    WAD_Marks: 15,
    CC_Marks: 20,
    DSBDA_Marks: 18,
    CNS_Marks: 19,
    AI_Marks: 20,
  },
];

// a, b, c) Insert Documents
app.get("/insert", async (req, res) => {
  await Student.deleteMany({});
  await Student.insertMany(sampleData);
  res.send("Sample students inserted!");
});

// d) Total Count and All Documents
app.get("/all", async (req, res) => {
  const students = await Student.find();
  const count = await Student.countDocuments();
  res.send({ count, students });
});

// e) Students with DSBDA > 20
app.get("/dsbda", async (req, res) => {
  const students = await Student.find(
    { DSBDA_Marks: { $gt: 20 } },
    { Name: 1, _id: 0 }
  );
  res.send(students);
});

// f) Update marks of specified student
app.put("/update/:name", async (req, res) => {
  const { name } = req.params;
  const updated = await Student.updateOne(
    { Name: name },
    {
      $inc: {
        WAD_Marks: 10,
        CC_Marks: 10,
        DSBDA_Marks: 10,
        CNS_Marks: 10,
        AI_Marks: 10,
      },
    }
  );
  res.send(updated);
});

// g) Students with >25 in all subjects
app.get("/above25", async (req, res) => {
  const students = await Student.find(
    {
      WAD_Marks: { $gt: 25 },
      CC_Marks: { $gt: 25 },
      DSBDA_Marks: { $gt: 25 },
      CNS_Marks: { $gt: 25 },
      AI_Marks: { $gt: 25 },
    },
    { Name: 1, _id: 0 }
  );
  res.send(students);
});

// h) Less than 40 in both Maths and Science
app.get("/lessthan40", async (req, res) => {
  const students = await Student.find(
    {
      WAD_Marks: { $lt: 40 },
      CNS_Marks: { $lt: 40 },
    },
    { Name: 1, _id: 0 }
  );
  res.send(students);
});

// i) Remove student
app.delete("/remove/:name", async (req, res) => {
  const { name } = req.params;
  const removed = await Student.deleteOne({ Name: name });
  res.send(removed);
});

// j) Display in Tabular Format
app.get("/table", async (req, res) => {
  const students = await Student.find();
  let html = `<table border='1'><tr><th>Name</th><th>Roll No</th><th>WAD</th><th>DSBDA</th><th>CNS</th><th>CC</th><th>AI</th></tr>`;
  students.forEach((s) => {
    html += `<tr><td>${s.Name}</td><td>${s.Roll_No}</td><td>${s.WAD_Marks}</td><td>${s.DSBDA_Marks}</td><td>${s.CNS_Marks}</td><td>${s.CC_Marks}</td><td>${s.AI_Marks}</td></tr>`;
  });
  html += `</table>`;
  res.send(html);
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
