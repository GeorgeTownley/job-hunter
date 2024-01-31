const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(
  "./jobTrackerDB.sqlite",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the SQLite database.");
  }
);

db.run(`ALTER TABLE job_applications ADD COLUMN user_id INTEGER`, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Added user_id column to job_applications table.");
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS job_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employer TEXT NOT NULL,
    date_applied DATE NOT NULL,
    platform TEXT NOT NULL,
    progress TEXT NOT NULL,
    work_type TEXT NOT NULL,
    pay INTEGER
  )`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Created the job_applications table.");
  }
);

db.run(
  `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Created the users table.");
  }
);

module.exports = db;
