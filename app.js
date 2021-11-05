const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//body parser- parsing middleware to pass JSON data through forms
//parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended:false}));

//parse application/JSON
app.use(express.json());

//for static files, such as CSS
app.use(express.static('public'));

//Templating engine
//changing extension name
app.engine('hbs', exphbs({extname: '.hbs'}))
app.set('view engine', 'hbs'); //setting view engine to handlebars

//Routing
app.get('', (req,res)=>{
    res.render('home')
});

app.listen(port, () => console.log(`Listening on port ${port}`));
