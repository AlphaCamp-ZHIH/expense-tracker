const express = require("express");
const exphbs = require("express-handlebars");
const router = require('./routes/index');
require('./config/mongoose');
const app = express();

const port = process.env.PORT || 3000;

app.engine('hbs', exphbs({defaultLayout:'main', extname:'hbs'}));
app.set('view engine','hbs');
app.use(router);

app.listen(port, () =>
  console.log(`operate sever http://localhost/${port} successfully`)
);
