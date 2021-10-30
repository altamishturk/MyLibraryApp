// modules 
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');
const bookRouter = require('./routes/books');
const methodOverride = require('method-override');
const dotenv = require('dotenv');

// express instance 
const app = express();

// port on which server in running
dotenv.config({ path: 'config.env' });
const port = process.env.PORT || 3000;

// setting up things to use in project 
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }))

// database connection of mongo db 
const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

const db = mongoose.connection;

db.on('error', error => console.log(error));
db.once('open', () => console.log('connected to DB'));


// using router module 
app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);



// port at which server is running 
app.listen(port);