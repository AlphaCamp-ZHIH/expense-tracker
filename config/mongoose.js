const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/expense-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (e) => {
  console.log(e);
});

db.once("open", () => console.log("mongodb connected successfully"));

module.exports = db;
