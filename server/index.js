// server/index.js

// Database initialization
const DbInitializer = require('./database/DbInitializer');
const dbInitializer = new DbInitializer('database/TrainSchedules.db');
dbInitializer.Init();
// use "const db = dbInitializer.GetDatabase();" to get the database.

const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});