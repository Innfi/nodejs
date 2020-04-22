var express = require("express");
var mysql = require('mysql');
var router = express.Router();

let pool = mysql.createPool({
    host: "localhost",
    user: "innfi", 
    password: "test_pass",
    database: "InnfisTable"
});

router.get("/index", (req, res, next) => {
	res.send("api is working");
});

router.get("/", (req, res, next) => {
	pool.getConnection((err) => {
		if(err) throw err;

		var sql = "select todo_text, complete from todo_history";
		pool.query(sql, (err, result) => {
			if(err) throw err;

			console.log("----");
			for(var index in result) {
				console.log("text: " + result[index].todo_text);
				console.log("complete: " + result[index].complete);
			}
			console.log("----");

			res.send(result);
		});
	});	
});

router.post("/", (req, res, next) => {
	pool.getConnection((err) => {
		if(err) throw err;
		console.log("Connected to DB");

		for(var index in req.body.todos) {
			//console.log("text: " + todo.text);
			//console.log("isCompleted: " + todo.isCompleted);
			var todo = req.body.todos[index];
			console.log(todo.text);
			console.log(todo.isCompleted);
			
			var sql = `insert into todo_history(todo_text, complete) values ("${todo.text}", ${Number(todo.isCompleted)})`;
			pool.query(sql, (err, result) => {
				if(err) throw err;
			});
		}
	});

	res.send("test");	
});

router.delete("/", (req, res, next) => {
	pool.getConnection((err) => {
		if(err) throw err;

		const todo = req.body.todo;
		console.log("Delete: " + todo.todo_text);

		//FIXME: use key
		var sql = `delete from todo_history where todo_text='${todo.todo_text}'`;
		pool.query(sql, (err, result) => {
			if(err) throw err;
		});
	});

	res.sendStatus(200);
});

module.exports = router;

