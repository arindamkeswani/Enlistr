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

//Find user by searching
exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected
        console.log('Connected as ID (user controller Search DB ): ', connection.threadId);

        let searchTerm = req.body.search
        
        // use the connection
        //using "?" to prevent SQL_injection
        var searchShort = '%' + searchTerm + '%';
        connection.query('SELECT * FROM user where status = "active" AND (domain_skills LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR latest_degree LIKE ? OR major LIKE ? OR cgpa LIKE ?OR graduation_year LIKE ?OR achievements LIKE ?OR email LIKE ?OR contact LIKE ?)    ', [searchShort, searchShort, searchShort, searchShort,searchShort, searchShort, searchShort, searchShort,searchShort, searchShort], (err, rows) => {
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
}

//Render Add new user page
exports.form = (req, res) => {
    res.render('add-user');
}


//Submit details of new user
exports.create = (req, res) => {

    // res.render('add-user')

    const {first_name, last_name, latest_degree, major, cgpa, domain_skills, graduation_year, achievements, email, contact} = req.body;
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected
        console.log('Connected as ID (user controller Search DB ): ', connection.threadId);

        let searchTerm = req.body.search
        
        // use the connection
        //using "?" to prevent SQL_injection
        var searchShort = '%' + searchTerm + '%';
        connection.query('INSERT INTO user SET first_name= ?, last_name=?, latest_degree=?, major=?, cgpa=?, domain_skills=?, graduation_year=?, achievements=?, email=?, contact=?', [first_name, last_name, latest_degree, major, cgpa, domain_skills, graduation_year, achievements, email, contact],(err, rows) => {
            //When done with the connection, release it
            connection.release();

            if(!err){
                res.render('add-user',{alert: "User added successfully!"});
            }else{
                console.log(err);
            }

            // console.log("The data from user table: \n", rows);
        });

    })

}

//Edit user
exports.edit= (req,res) => {
    res.render('edit-user');
}