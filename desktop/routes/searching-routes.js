var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/', function(req, res) {
	var data = req.body; //Data takes type of json object
	for(var attribute in data){
		console.log(attribute+": "+data[attribute]);
	}
	
	// Test 
	res.render('results', {data:data.restName});
});

// Example route
router.get('/', function(req, res) {
	res.render('search');
});

module.exports = router;
