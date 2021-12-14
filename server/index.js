// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// require the sqlite driver better-sqlite3

const driver = require('better-sqlite3');


// connect to a database (call the connection db)

const db = driver('./database/booking.sqlite3');