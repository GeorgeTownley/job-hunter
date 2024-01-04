const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const port = 3001; // Has to be on a different port than the react front end

app.use(cors());
app.use(express.json()); // For parsing application/json

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/applications", (req, res) => {
  const { employer, dateApplied, platform, progress, workType, pay } = req.body;
  const sql = `INSERT INTO job_applications (employer, date_applied, platform, progress, work_type, pay) VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(
    sql,
    [employer, dateApplied, platform, progress, workType, pay],
    function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});
