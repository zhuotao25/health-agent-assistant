var express = require('express');

// This creates an express "router" that allows us to separate
// particular routes from the main application.
var router = express.Router();

// Example post
router.post('/post', (req, res) => {console.log("posted");});

// Example route
router.get('/', function(req, res) {console.log("routed");});

module.exports = router;
