require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDb = require('./config/db');
const hbs = require('hbs');

const app = express();
connectDb();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Register the partials
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
