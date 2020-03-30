var mysql = require('mysql');

var conn = mysql.createConnection({
    host: "localhost",
    user: "innfi", 
    password: "test_pass",
    database: "InnfisTable"
});

conn.connect(function (err) {
    if (err) throw err;
    console.log("connected");

    //conn.query("create database InnfisTable", function (err, result) {
    //    if (err) throw err;
    //    console.log("database created");
    //});

    var createQeury = "create table Players (UserId INT(11), Nickname VARCHAR(255))";

    conn.query(createQeury, function (err, result) {
        if (err) throw err;

        console.log("table created");
    });
});

