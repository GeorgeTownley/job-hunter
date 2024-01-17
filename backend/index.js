const express = require("express");
const cors = require("cors");
const db = require("./database");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get("/applications", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// -----------------------
// Job Applications Routes
// -----------------------

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

app.post("/applications", (req, res) => {
  // Destructure the properties from req.body
  const { employer, date_applied, platform, progress, work_type, pay } =
    req.body;

  // Prepare the SQL query
  const sql = `INSERT INTO job_applications (employer, date_applied, platform, progress, work_type, pay) VALUES (?, ?, ?, ?, ?, ?)`;

  // Execute the SQL query
  db.run(
    sql,
    [employer, date_applied, platform, progress, work_type, pay],
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

app.delete("/applications/:id", (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM job_applications WHERE id = ?";

  db.run(sql, id, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: "Deleted successfully", rowsDeleted: this.changes });
  });
});

// -----------------------
// User Authentication Routes
// -----------------------

// Registration route
app.post("/register", async (req, res) => {
  // Destructure the properties from req.body
  const { email, username, password } = req.body;

  // Check if the email or username already exists
  const checkUserSql = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.get(checkUserSql, [email, username], async (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (row) {
      res
        .status(409)
        .json({ error: "User already exists with this email or username" });
      return;
    }

    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Prepare the SQL query
      const sql =
        "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";

      // Execute the SQL query
      db.run(sql, [email, username, hashedPassword], function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        // If no error, send the newly created user ID in the response
        res.status(201).json({ success: "User created", id: this.lastID });
      });
    } catch (hashError) {
      res.status(500).json({ error: hashError.message });
    }
  });
});

// INSECURE ROUTE FOR TESTING ONLY. MAKE SURE YOU DELETE THIS
app.get("/users", (req, res) => {
  const sql = "SELECT id, username, password FROM users";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});
