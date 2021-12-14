// server/index.js
// import DbInitializer from "./database/DbInitializer.js";

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// usings in c#
let DbInitializer = require('./database/DbInitializer').default;
let dbInitializer = new DbInitializer();
dbInitializer.CreateTables();
