const express = require("express");
const exphbs = require("express-handlebars");
const router = require('./routes/index');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Record = require('./models/record');
require('./config/mongoose');
const filterDate = require('./helper/helper').filterDate;
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  Record.find()
    .sort({ date: 'asc' })
    .lean()
    .then(expenses =>
      filterDate(expenses)
    ).then(yms => {
      res.locals.yms = yms;
    }).then(() => next());

});
app.use(router);

app.listen(port, () =>
  console.log(`operate sever http://localhost/${port} successfully`)
);
