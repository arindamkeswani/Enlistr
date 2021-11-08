const mysql = require('mysql');


//connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});



//Routing

//view users
exports.view = (req, res) => {
    // res.render('home');


    //Connect to DB
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected
        console.log('Connected as ID (user controller View DB ): ', connection.threadId);


        // use the connection
        connection.query('SELECT * FROM user where status="active"', (err, rows) => {
            //When done with the connection, release it
            connection.release();

            if(!err){
                res.render('home', {rows});
            }else{
                console.log(err);
            }

            // console.log("The data from user table: \n", rows);
        });

    })
};