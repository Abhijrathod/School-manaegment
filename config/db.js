const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'school_management'
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err.message);
        process.exit(1);
    }
    console.log("Connected to MySQL database!");
});

module.exports = connection;
