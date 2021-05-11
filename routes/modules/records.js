const express = require("express");
const Record = require('../../models/record');
const Category = require('../../models/category');
const router = express.Router();
const whichCategory = require('../../helper/helper').whichCategory;

// 新增支出
router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/', (req, res) => {
  const { name, category, amount, date, merchant } = req.body;
  if (!name || !category || !amount || !date) {
    return res.render('new', { expense: req.body, ...whichCategory(category), wrongMsg: "請填寫必填欄位" })
  }

  Category.findOne({ name: category })
    .lean()
    .then(category => {
      return Record.create({
        name,
        amount,
        date,
        merchant,
        category: category.name,
        categoryIcon: category.icon
      })
        .then(() => res.redirect('/'))
        .catch(e => console.log(e))
    })

})
// 刪除支出
router.delete('/:id', (req, res) => {
  const expenseId = req.params.id;
  Record.findById(expenseId)
    .then(expense => {
      return expense.remove()
    })
    .then(() => res.redirect('/'))
})


module.exports = router