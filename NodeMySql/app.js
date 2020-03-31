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

    //var createQuery = "create table Players (UserId INT(11), Nickname VARCHAR(255))";

    //conn.query(createQuery, function (err, result) {
    //    if (err) throw err;

    //    console.log("table created");
    //});

    var insertQuery = "insert into Players(UserId, Nickname) values(1, \"innfi\")";

    conn.query(insertQuery, function (err, result) {
        if (err) throw err;

        console.log("insert finished");
    });

    var selectQuery = "select * from Players";

    conn.query(selectQuery, function (err, result, fields) {
        if (err) throw err;

        console.log(result);
    });
});

