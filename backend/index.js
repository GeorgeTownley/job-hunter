const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
const port = 3001; // Has to be on a different port than the react front end

app.use(cors());
app.use(express.json()); // For parsing application/json

app.get("/applications", (req, res) => {
  res.send("Hello from the backend!");
});

// GET route for /applications/all
app.get("/applications/all", (req, res) => {
  const sql = "SELECT * FROM job_applications";
  db.all(sql, [], (err, rows) => {
    if (err) {
      // If an error occurs, send the error message in the response
      res.status(500).json({ error: err.message });
      return;
    }
    // If no error, send the retrieved rows (data) in the response
    res.json({
      data: rows,
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post("/applications", (req, res) => {
  // Destructure the properties from req.body
  const { employer, dateApplied, platform, progress, work_type, pay } =
    req.body;

  // Prepare the SQL query
  const sql = `INSERT INTO job_applications (employer, date_applied, platform, progress, work_type, pay) VALUES (?, ?, ?, ?, ?, ?)`;

  // Execute the SQL query
  db.run(
    sql,
    [employer, dateApplied, platform, progress, work_type, pay],
    function (err) {
      if (err) {
        console.error(err);
        // If an error occurs, send the error message in the response
        res.status(500).json({ error: err.message });
        return;
      }
      // If no error, send the newly created application ID in the response
      res.json({ id: this.lastID });
    }
  );
});

app.put("/applications/:id", (req, res) => {
  const { id } = req.params;
  const { employer, date_applied, platform, progress, work_type, pay } =
    req.body;

  const sql = `UPDATE job_applications SET employer = ?, date_applied = ?, platform = ?, progress = ?, work_type = ?, pay = ? WHERE id = ?`;

  db.run(
    sql,
    [employer, date_applied, platform, progress, work_type, pay, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Updated successfully", rowsUpdated: this.changes });
    }
  );
});
