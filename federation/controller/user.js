var sqlQuery = require('./sqlQueryWriter');
var db = require('./dbCommunicator');

exports.registerNewUser = function(userObject, callback) {
	//do the queries, define string error based on the query
	var result = {};
	userObject.location = ['Sunderland', 'Leverett'];
	userObject.type = 'User';
	//TODO: Fix privilege level
	userObject.privilegeLevel = 1;
	var query = sqlQuery.writeSQLAdd(userObject);
	//db.run(query, function(err, 

	var error = "Did not work";
	result.success = false;
	if(result.success){
		result.desc = "";
		callback(result);
	}
	else{
		result.desc = error;
		callback(result);
	}
}

exports.editPassword = function(userObject, callback){
	//do the queries, define string error based on the query
	userObject.location = ['Sunderland', 'Leverett'];
	userObject.type = 'User';
	var query = sqlQuery.writeSQLEdit(userObject);

	var result = {};
	var error = "Did not work";
	result.success = false;
	if(result.success){
		result.desc = "";
		callback(result);
	}
	else{
		result.desc = error;
		callback(result);
	}
}

exports.loginUser = function(userObject, callback){
	//do the queries, define string error based on the query
	userObject.location = ['Sunderland', 'Leverett'];
	userObject.type = 'User';
	var query = sqlQuery.writeSQLGet(userObject);
	//TODO: Send query

	var result = {};
	var error = "Did not work";
	result.success = false;
	if(result.success){
		result.desc = "";
		callback(result);
	}
	else{
		result.desc = error;
		callback(result);
	}
}

exports.addSearch = function(userObject, callback){
	//do the queries, define string error based on the query
	userObject.location = ['Sunderland', 'Leverett'];
	userObject.type = 'Saved Searches';
	//TODO: Fix privilege level
	var query = sqlQuery.writeSQLAdd(userObject);

	var result = {};
	var error = "Did not work";
	result.success = false;
	if(result.success){
		result.desc = "";
		callback(result);
	}
	else{
		result.desc = error;
		callback(result);
	}
}

exports.removeSearch = function(userObject, callback){
	//do the queries, define string error based on the query
	var result = {};
	var error = "Did not work";
	result.success = false;
	if(result.success){
		result.desc = "";
		callback(result);
	}
	else{
		result.desc = error;
		callback(result);
	}
}

exports.getSearches = function(userObject, callback){
	//do the queries, define string error based on the query
	var result = {};
	var error = "Did not work";
	result.success = false;
	if(result.success){
		result.desc = "";
		callback(result);
	}
	else{
		result.desc = error;
		callback(result);
	}
}
