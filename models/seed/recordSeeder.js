const Record = require("../record");
const categoryData = require("./categorySeeder");
const db = require("../../config/mongoose");

db.once("open", () => {
  const data = Array.from({ length: 9 }, (_, i) => {
    return Record.create({
      name: `name-${i}`,
      date: `2021-05-1${i}`,
      category: categoryData[i].category,
      categoryIcon: categoryData[i].class,
      amount: (i+1) * 100,
      merchant: `你家-${i}`,
    });
  });
  Promise.all(data)
    .then(() => {
      console.log("generate seeds successfully");
      process.exit();
    })
    .catch((error) => console.log(error));
});
