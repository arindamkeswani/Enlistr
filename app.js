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



//connection pool
const pool = mysql.createPool({
    connectionLimit : 100, 
    host            : process.env.DB_HOST,
    port            : process.env.DB_PORT,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});


//Connect to DB
pool.getConnection((err, connection)=>{
    if(err)
        throw err; //not connected
    console.log('Connected as ID: ', connection.threadId);
})


//Routing
app.get('', (req,res)=>{
    res.render('home')
});

app.listen(port, () => console.log(`Listening on port ${port}`));
