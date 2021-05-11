const express = require("express");
const Record = require('../../models/record');
const Category = require('../../models/category');
const router = express.Router();
const whichCategory = require('../../helper/helper').whichCategory;
const calculateTotalMount =require('../../helper/helper').calculateTotalMount;
const category_cht = require('../../helper/helper').category_cht;


//filter
router.get('/filter', (req, res) => {
  const category = req.query.category;
  // console.log(category);
  Record.find({ category })
    .sort({ _id: "asc" })
    .lean()
    .then(expenses => {
      const totalAmount = calculateTotalMount(expenses);
      res.render('index', { expenses, totalAmount, category_cht: category_cht[category]})
    })
})



//編輯支出
router.get('/:id/edit', (req, res) => {
  const expenseId = req.params.id;
  Record.findById(expenseId)
    .lean()
    .then(expense => {
      res.render('edit', { expense, ...whichCategory(expense.category) });
    });
});

router.put('/:id', (req, res) => {
  const expenseId = req.params.id;
  const { name, category, amount, date, merchant } = req.body;
  if (!name || !category || !amount || !date) {
    return res.render('edit', { expense: req.body, ...whichCategory(category), wrongMsg: "請填寫必填欄位" });
  };
  Category.findOne({ name: category })
    .lean()
    .then(category => {
      Record.findById(expenseId)
        .then(expence => {
          const props = Object.keys(req.body);
          props.map(prop => expence[prop] = req.body[prop])
          expence.categoryIcon = category.icon;
          return expence.save();
        })
    })
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
})

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
    })
    .then(() => res.redirect('/'))
    .catch(e => console.log(e))
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