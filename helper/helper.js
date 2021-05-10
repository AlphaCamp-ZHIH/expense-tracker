module.exports.calculateTotalMount = (arr) => {
  // console.log(arr)
  return arr.reduce((a, b) => a + b.amount, 0);
};
