const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const app = express();
const port = 80;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Jurimma app listening at http://localhost:${port} 😘`);
});
