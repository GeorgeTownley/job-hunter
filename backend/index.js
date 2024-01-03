const express = require("express");
const cors = require("cors");

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
