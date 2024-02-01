const express = require("express");
const cors = require("cors");
const db = require("./database");
const bcrypt = require("bcrypt");

const saltRounds = 10;
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const { getSession } = require("next-auth/react");

app.get("/applications", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { employer, date_applied, platform, progress, work_type, pay } = req.body;

// -----------------------
// Job Applications Routes
// -----------------------

app.get("/applications/all", async (req, res) => {
  // Retrieve the user's session
  const session = await getSession({ req });
  if (!session || !session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userId = session.user.id;
  const sqlGetUserApplications =
    "SELECT * FROM job_applications WHERE user_id = ?";
  db.all(sqlGetUserApplications, [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

app.post("/applications", async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const userId = session.user.id;
  const { employer, date_applied, platform, progress, work_type, pay } =
    req.body;
  const sqlInsertApplication = `INSERT INTO job_applications (user_id, employer, date_applied, platform, progress, work_type, pay) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(
    sqlInsertApplication,
    [userId, employer, date_applied, platform, progress, work_type, pay],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.put("/applications/:id", async (req, res) => {
  // Retrieve the user's session
  const session = await getSession({ req });
  if (!session || !session.user) {
    // If no session is found, return an unauthorized error
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  db.run(
    sql,
    [employer, date_applied, platform, progress, work_type, pay, id, userId],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({
          error:
            "No such application found or you do not have permission to edit it.",
        });
      } else {
        res.json({
          message: "Updated successfully",
          rowsUpdated: this.changes,
        });
      }
    }
  );
});

app.delete("/applications/:id", async (req, res) => {
  // Retrieve the user's session
  const session = await getSession({ req });
  if (!session || !session.user) {
    // If no session is found, return an unauthorized error
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  db.run(sql, [id, userId], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({
        error:
          "No such application found or you do not have permission to delete it.",
      });
    } else {
      res.json({ message: "Deleted successfully", rowsDeleted: this.changes });
    }
  });
});

// -----------------------
// User Authentication Routes
// -----------------------

// Registration route
app.post("/register", async (req, res) => {
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

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.get(sql, [username], (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          // Passwords match, handle successful login
          res.json({ success: "Logged in successfully" });
        } else {
          // Passwords don't match
          res.status(401).json({ error: "Invalid credentials" });
        }
      });
    } else {
      // User not found
      res.status(404).json({ error: "User not found" });
    }
  });
});
