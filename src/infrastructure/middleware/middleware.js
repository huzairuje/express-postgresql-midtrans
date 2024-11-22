const { setErrorResponse } = require('../httplib/httplib');

// Function to create the middleware using the RateLimiter
function rateMiddleware(limiter) {
    return (req, res, next) => {
        if (limiter.allow()) {
            next();
        } else {
            setErrorResponse(res, 429, "Rate limit exceeded", null);
        }
    };
}

// Middleware to handle "Not Found" routes
function notFoundHandler() {
    return (req, res, next) => {
        setErrorResponse(res, 404, "Not found Routes or Page", null);
    };
}

module.exports = {
    rateMiddleware,
    notFoundHandler,
}