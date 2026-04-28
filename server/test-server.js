const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.send("Test route working 🚀");
});

app.listen(5000, () => {
  console.log("TEST SERVER running on 5000");
});