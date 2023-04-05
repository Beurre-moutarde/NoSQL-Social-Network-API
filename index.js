const express = require("express");
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const cwd = process.cwd();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(require("./routes"));


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });

