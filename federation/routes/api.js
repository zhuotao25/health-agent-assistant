var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}

});

router.post('/edit', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}
	
});

router.post('/remove', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}
	
});

router.get('/get', function(req, res, next) {
	if (!hasValidLocation(req.body) || !hasValidType(req.body)) {
		res.send("Invalid data");
		return;
	}
	
});

router.get('/database', function(req, res, next) {
	if (!hasValidLocation(req.body)) {
		res.send("Invalid data");
		return;
	}
	
});

function hasValidLocation(data) {
	if (!data.hasOwnProperty('location')) {
		return false;
	}

	if (!data.location.isArray()) {
		data.location = [data.location];
	}

	return true;
}

function hasValidType(data) {
	if (!data.hasOwnProperty('type')) {
		return false;
	}

	return true;
}

module.exports = router;
