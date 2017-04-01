// Routing variables
const express = require('express')
, router = express.Router()
, path = require('path')
, appName = 'Apix Client'
;

// Controllers
const ApixNodes = require('../controllers/apixNodes');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html')
});

function buildEndpoint(label) {
    return '/x/' + label
}
// buildQuery = function(queries) {
//     if (!queries) return ''

//     var query = '';

//     // Iterate and concat our query params+
//     var numQueries = queries.lenth;
//     for (var i = 0; i < numQueries; i++) {
//         if (i = 0) query.concat('?')
//         else query.concat('&')

//         query.concat('=')
//         query.concat(queries[i])
//     }
// }
// buildEndpointWithQuery = function(endpointSuffix, queries) {
//     return buildEndpoint(endpointSuffix) + buildQuery(queries)
// }

// Custom Routes
// router.get('/nodes', ApixNodes.getApixNode());
router.get(buildEndpoint('movie'), ApixNodes.getApixNode);
router.post(buildEndpoint('movie'), ApixNodes.postApixNode);

module.exports = router;