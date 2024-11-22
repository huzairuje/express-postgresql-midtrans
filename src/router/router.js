const express = require('express');
const {rateMiddleware, notFoundHandler } = require('../infrastructure/middleware/middleware');

class HandlerRouter {
    constructor(setup) {
        this.setup = setup;
    }

    routerWithMiddleware() {
        const app = express();

        // Use limiter middleware
        app.use(rateMiddleware(this.setup.limiter));

        // Middleware to parse JSON
        app.use(express.json());

        const expressRouter = express.Router();

        //define grouping api /api/v1 router
        const apiV1Router = app.use('/api/v1', expressRouter);

        // Define health module routes for /api/v1
        apiV1Router.use('', this.setup.healthHandler.setupRoutes(expressRouter));
        apiV1Router.use('', this.setup.customerHandler.setupRoutes(expressRouter));
        apiV1Router.use('', this.setup.productHandler.setupRoutes(expressRouter));

        // Use not-found middleware
        app.use(notFoundHandler());

        return app;
    }
}

module.exports = HandlerRouter;