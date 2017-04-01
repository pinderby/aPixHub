const request = require('request');

function getUrlFromReq(req) {
    return req.protocol + '://' + 'apix.rocks' + req.originalUrl;
}

exports.makeRequest = function(req, handleResult, handleError) {
    // Build an async Promise to chain our request
    new Promise(function(resolve, reject) {
            request(getUrlFromReq(req), function(error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the request body
            
            if (error) {
                reject(Error(error));
            } else {
                resolve(response);
            }
        });
    })
    // After our Promise returns, call the passed in handlers
    .then(handleResult, handleError);
}