var express = require('express');
var router = express.Router();
var sqlQuery = require('../controller/sqlQueryController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
	console.log(req.body);
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}
	//TODO: Check permissions
	//TODO: send to database
	res.send(sqlQuery.writeSQLAdd(req.body));
});

router.post('/edit', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}

	res.send(sqlQuery.writeSQLEdit(req.body));	
});

router.post('/remove', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}
	
	res.send(sqlQuery.writeSQLRemove(req.body));	
});

router.post('/get', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}
	
	res.send(sqlQuery.writeSQLGet(req.body));	
});

router.post('/database', function(req, res, next) {
	if (!hasValidLocation(req.body)) {
		res.send("Invalid data");
		return;
	}
	
});

function hasValidLocation(data) {
	if (!data.hasOwnProperty('location')) {
		return false;
	}

	//TODO
	//if (!data.location.isArray()) {
	//	data.location = [data.location];
	//}

	return true;
}

function hasValidType(data) {
	if (!data.hasOwnProperty('type')) {
		return false;
	}

	return true;
}

module.exports = router;
