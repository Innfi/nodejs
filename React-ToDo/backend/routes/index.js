const express = require('express');
const mysql = require('mysql');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let conn = mysql.createConnection({
  host: "localhost",
  user: "innfi", 
  password: "test_pass",
  database: "InnfisTable"
});

router.post('/todo-history', (req, res) => {
  res.send('test');
  // conn.query("insert into todo_history(todo_text, complete) values ('hello', 1)", (err) => {
  //   if(err) throw err;

  //   res.send('test');
  // });
});

module.exports = router;
