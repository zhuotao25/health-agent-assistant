var express = require('express');
var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register', function(req, res, next) {
	console.log("/register");
	var user = req.body;
	require('../controller/user.js').registerNewUser(user, function(result){
		res.send(result);
	});
});

// router.post('/editpassword', function(req, res, next) {
// 	var user = req.body;
// 	userController.editPassword(user, function(result){
// 		res.JSON(result);
// 	});
// });

// router.post('/login', function(req, res, next) {
// 	var user = req.body;
// 	userController.loginUser(user, function(result){
// 		res.JSON(result);
// 	});
// });

// router.post('/addsearch', function(req, res, next) {
// 	var user = req.body;
// 	userController.addSearch(user, function(result){
// 		res.JSON(result);
// 	});
// });

// router.post('/removesearch', function(req, res, next) {
// 	var user = req.body;
// 	userController.removeSearch(user, function(result){
// 		res.JSON(result);
// 	});
// });

// router.get('/getsearches', function(req, res, next) {
// 	var user = req.body;
// 	userController.getSearches(user, function(result){
// 		res.JSON(result);
// 	});
// });


module.exports = router;
