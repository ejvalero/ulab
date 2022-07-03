const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('express-handlebars');



/**
 * 
 * init the app
 */
const app = express();



/**
 * 
 * Settings
 * - Default app port
 * - View dir
 * - View engine
 */
const PORT = process.env.PORT || 4000;
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  hbs.engine(
    {
      defaultLayout: 'main',
      layoutsDir: path.join(app.get('views'), 'layouts'),
      partialsDir: path.join(app.get('views'), 'partials'),
      extname: '.hbs',
      helpers: require('./lib/handlebars')
    }
  )
);
app.set('view engine', '.hbs');



/**
 * 
 * Middlewares
 * - urlencoded
 * - json
 */
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



/**
 * 
 * Globals
 */
app.use(
  (req, res, next) => {

    next();
  }
);



/**
 * 
 * Routes
 * - main
 * - auth
 * - personal
 * - labs
 */
app.use(require('./routes'));



/**
 * 
 * Public files
 */
app.use(
  express.static(path.join(__dirname, 'public'))
);



/**
 * 
 * Run server
 */
const defaultPort = app.get('port');
app.listen(
  defaultPort,
  () => {
    console.log(
      `Server running successfully on port ${defaultPort}`
    );
  }
);