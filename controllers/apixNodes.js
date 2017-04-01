const helper = require('./controllerHelpers');

exports.getApixNode = function(componentDir) {
    return function(req, res) {
        helper.makeRequest(req, function(result) {
            res.render(componentDir, {apixNode: result})
        }, function(err) {
            // TODO Render custom error HTML
            res.send(err);
        });
    };
}