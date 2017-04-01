// Routing variables
var express = require('express')
, router = express.Router()
, path = require('path')
, appName = 'Apix Client'
;

// Controllers

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Render index.html');
    res.render('index.html');
//   res.render('index', { title: appName });
//   res.sendFile(path.resolve(__dirname + '/../public/index.html'));
});

// Custom Routes?

module.exports = router;