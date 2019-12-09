const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const mustacheExpress = require('mustache-express');

const PORT = 3000;

// Set view engine
const VIEWS_PATH = path.join(__dirname, 'views');
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'));
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Global middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve static files
app.use('/dist', express.static(path.resolve(__dirname, './dist')));
app.use('/public', express.static(path.resolve(__dirname, './public')));

// Route Handlers
const index = require('./routes/index');

// Routing
app.use('/', index);


app.listen(PORT, () => console.log('listening on port: ', PORT));
