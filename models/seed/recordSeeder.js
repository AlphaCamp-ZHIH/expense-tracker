const Record = require("../record");
const Category = require("../category");
const db = require("../../config/mongoose");
const type = ["traffic",
  "entertainment",
  "home",
  "food",
  "other"]


db.once("open", () => {
  const data = Array.from({ length: 9 }, (_, i) => {
    const randomNum = Math.floor(Math.random() * 5);
    return Category.findOne({ name: type[randomNum] })
      .lean()
      .then(category => {

        return Record.create({
          name: `name-${i}`,
          date: `2021-05-1${i}`,
          category: category.name,
          categoryIcon: category.icon,
          amount: (i + 1) * 100,
          merchant: `你家-${i}`,
        });
      })
  });
  Promise.all(data)
    .then(() => {
      console.log("generate record seed successfully");
      process.exit();
    })
    .catch((error) => console.log(error));
});
