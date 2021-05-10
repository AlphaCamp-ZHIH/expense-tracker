const express = require("express");
const exphbs = require("express-handlebars");

require('./config/mongoose');
const app = express();

const port = process.env.PORT || 3000;

app.engine('hbs', exphbs({defaultLayout:'main', extname:'hbs'}));
app.set('view engine','hbs');
app.use("/", (req, res) => {
  res.render('index')
});

app.listen(port, () =>
  console.log(`operate sever http://localhost/${port} successfully`)
);
