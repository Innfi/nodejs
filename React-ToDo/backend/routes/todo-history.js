var express = require("express");
var router = express.Router();

router.get("/index", (req, res, next) => {
	res.send("api is working");
});

router.post("/", (req, res, next) => {
	res.send("test");
});

module.exports = router;

