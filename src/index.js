const express = require('express');
const morgan = require('morgan');
const path = require('path');
const hbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');



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
const PORT = process.env.PORT || 5000;
app.set('port', PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  'hbs',
  hbs.engine(
    {
      defaultLayout: 'client',
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
 * - connectflash
 */
app.use(
  session(
    {
      secret: 'thebestsecret',
      resave: false,
      saveUninitialized: false,
      store: new MySQLStore(database)
    }
  )
);
app.use(flash());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());




/**
 * 
 * Globals
 */
app.use(
  (req, res, next) => {
    app.locals.userAdmin = false;

    app.locals.success = req.flash('success');
    app.locals.failed = req.flash('failed');

    next();
  }
);




/**
 * 
 * Public files
 */
 app.use(
  express.static(path.join(__dirname, 'public'))
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