module.exports.calculateTotalMount = (arr) => {
  // console.log(arr)
  return arr.reduce((a, b) => a + b.amount, 0);
};
module.exports.whichCategory = (category) => {
  if (category === "home") return { isHome: true };
  if (category === "traffic") return { isTraffic: true };
  if (category === "entertainment") return { isEntertainment: true };
  if (category === "food") return { isFood: true };
  if (category === "other") return { isOther: true };
};
