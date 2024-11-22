const {setSuccessResponse, setErrorResponse} = require('../../infrastructure/httplib/httplib');

class HealthHandler {
    constructor(healthService) {
        this.healthService = healthService;
    }

    /**
     * Sets up routes for health-related endpoints
     * @param {import('express').Router} router - Express router instance
     * @returns {import('express').Router}
     */
    setupRoutes(router) {
        router.get('/health/ping', this.ping);
        router.get('/health/check', this.healthCheckApi.bind(this)); // Bind for proper context
        return router;
    }

    /**
     * Handles the /ping endpoint
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async ping(req, res) {
        return setSuccessResponse(res, 200, "pong", null);
    }

    /**
     * Handles the /check endpoint for health status
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async healthCheckApi(req, res) {
        try {
            const healthStatus = await this.healthService.checkUpTime();
            return setSuccessResponse(res, 200, "OK", healthStatus);
        } catch (error) {
            console.error("Health check API error:", error);
            return setErrorResponse(res, 500, "Something went wrong", error);
        }
    }
}

module.exports = HealthHandler;
