const helper = require('./controllerHelpers');

function prepareNode(componentDir) {
    return function(req, res) {
        helper.makeRequest(req, function(result) {
            res.render(componentDir, {apixNode: result})
        }, function(err) {
            // TODO Render custom error HTML
            res.send(err);
        });
    };
}

// TODO For now, the logic to display a retrieved node vs a newly created one is identical
// Still exposing them as separate methods in case there's any extra steps added (that don't need to be exposed to main.js)
exports.getApixNode = function(componentDir) {
    return prepareNode(componentDir)
}

exports.createApixNode = function(componentDir) {
    return prepareNode(componentDir)
}