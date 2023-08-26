var mysql = require('mysql')
var con = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "1579",
    database: "planner_db",
    //port: "3306"
    //socket: '/var/run/mysqld/mysqld.sock'
});

module.exports = async (...stuff) => new Promise((resolve, reject) => {
    con.query(...stuff, (err, res) => {
        if (err)
            reject(err);
        else
            resolve(res);
    });
});