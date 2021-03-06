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

            if (!err) {
                let removedUser = req.query.removed;

                res.render('home', { rows , removedUser });
            } else {
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
        connection.query('SELECT * FROM user where status = "active" AND (domain_skills LIKE ? OR first_name LIKE ? OR last_name LIKE ? OR latest_degree LIKE ? OR major LIKE ? OR cgpa LIKE ?OR graduation_year LIKE ?OR achievements LIKE ?OR email LIKE ?OR contact LIKE ?)    ', [searchShort, searchShort, searchShort, searchShort, searchShort, searchShort, searchShort, searchShort, searchShort, searchShort], (err, rows) => {
            //When done with the connection, release it
            connection.release();

            if (!err) {
                res.render('home', { rows });
            } else {
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

    const { first_name, last_name, latest_degree, major, cgpa, domain_skills, graduation_year, achievements, email, contact } = req.body;
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected
        console.log('Connected as ID (user controller Search DB ): ', connection.threadId);

        let searchTerm = req.body.search

        // use the connection
        //using "?" to prevent SQL_injection
        var searchShort = '%' + searchTerm + '%';
        connection.query('INSERT INTO user SET first_name= ?, last_name=?, latest_degree=?, major=?, cgpa=?, domain_skills=?, graduation_year=?, achievements=?, email=?, contact=?', [first_name, last_name, latest_degree, major, cgpa, domain_skills, graduation_year, achievements, email, contact], (err, rows) => {
            //When done with the connection, release it
            connection.release();

            if (!err) {
                res.render('add-user', { alert: "User added successfully!" });
            } else {
                console.log(err);
            }

            // console.log("The data from user table: \n", rows);
        });

    })

}

//Edit user page data retrieval 
exports.edit = (req, res) => {
    // res.render('edit-user');
    pool.getConnection((err, connection) => {
        // if (err)
        //     throw err; //not connected
        // console.log('Connected as ID (user controller View DB ): ', connection.threadId);


        // use the connection
        connection.query('SELECT * FROM user where id=?', [req.params.id], (err, rows) => {
            //When done with the connection, release it
            connection.release();

            if (!err) {
                res.render('edit-user', { rows });
            } else {
                console.log(err);
            }
            // console.log('The data from user table: \n', rows);
        });

    })
}


//update user
exports.update = (req, res) => {
    console.log("THIS IS N ID:", req.params.id);
    const { first_name, last_name, latest_degree, major, cgpa, domain_skills, graduation_year, achievements, email, contact } = req.body;
    pool.getConnection((err, connection) => {
        if (err)
            throw err; //not connected
        console.log('Connected as ID (user controller View DB ): ', connection.threadId);


        // use the connection
        connection.query('UPDATE user SET first_name=?, last_name=?, latest_degree=?, major=?, cgpa=?, domain_skills=?, graduation_year=?, achievements=?, email=?, contact=? WHERE id=?', [first_name, last_name, latest_degree, major, cgpa, domain_skills, graduation_year, achievements, email, contact, req.params.id], (err, rows) => {
            //When done with the connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err)
                        throw err; //not connected
                    console.log('Connected as ID (user controller View DB ): ', connection.threadId);


                    // use the connection
                    connection.query('SELECT * FROM user where id=?', [req.params.id], (err, rows) => {
                        //When done with the connection, release it
                        connection.release();

                        if (!err) {
                            res.render('edit-user', { rows, alert: `${first_name} ${last_name}'s details have been updated successfully.` });
                        } else {
                            console.log(err);
                        }

                    });

                })
            } else {
                console.log(err);
            }

        });

    })
}


//delete user
exports.delete = (req, res) => {
    // res.render('edit-user');
    pool.getConnection((err, connection) => {
        // if (err)
        //     throw err; //not connected
        // console.log('Connected as ID (user controller View DB ): ', connection.threadId);


        // use the connection
        connection.query('UPDATE user SET status=? WHERE id=?', ['removed', req.params.id], (err, rows) => {
            //When done with the connection, release it

            connection.release();

            if (!err) {
                let removedUser = encodeURIComponent('User successefully removed.');
                res.redirect('/?removed=' + removedUser);
            } else {
                console.log(err);
            }
        });

    })
}


exports.viewProfile = (req, res) => {

    pool.getConnection((err, connection) => {
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
            if (!err) {
                res.render('view-user', { rows });
            } else {
                console.log(err);
            }

        });
    })
}