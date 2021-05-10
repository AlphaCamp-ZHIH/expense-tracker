const type = [
  {category: "traffic", class: "fa-shuttle-van" },
   {category:"entertainment", class: "fa-grin-beam"},
   {category:"home", class: "fa-home"},
   {category:"food", class: "fa-utensils"},
   {category:"other", class: "fa-pen"},
];
const categoryData = [];
for (let i = 0; i < 9; ++i) {
  const randomNum = Math.floor(Math.random() * 5);
  categoryData.push(type[randomNum]);
}

module.exports = categoryData;
