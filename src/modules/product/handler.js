const { validate } = require('uuid');
const {setErrorResponse, setSuccessResponse, setPaginationResponse} = require("../../infrastructure/httplib/httplib");

class ProductHandler {
    constructor(productService) {
        this.productService = productService;
    }

    /**
     * Sets up routes for health-related endpoints
     * @param {import('express').Router} router - Express router instance
     * @returns {import('express').Router}
     */
    setupRoutes(router) {
        router.get('/products', this.getAllProducts.bind(this));
        router.post('/products', this.createProduct.bind(this));
        router.get('/products/:id', this.getProductById.bind(this));
        router.put('/products/:id', this.updateProduct.bind(this));
        router.delete('/products/:id', this.deleteProduct.bind(this));
        return router;
    }

    /**
     * Handles the /products endpoint for get all products
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async getAllProducts(req, res) {
        const { name, limit = 10, page = 1, orderBy = "created_at", orderDirection = "desc" } = req.query;
        const offset = (page - 1) * limit;
        try {
            const result = await this.productService.getAllProducts(name, limit, offset, orderBy, orderDirection);
            return setPaginationResponse(res,
                200,
                "success get all data product",
                result.products,
                result.totalCount,
                page,
                limit);
        } catch (error) {
            return setErrorResponse(res, 500, error.message, null);
        }
    }

    /**
     * Handles the /products/:id endpoint for get product detail
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async getProductById(req, res) {
        const { id } = req.params;
        console.log("Request path:", req.path); // Log the full request path
        console.log("Received product ID:", id); // Log the ID being passed

        // Validate the ID only if it's present
        if (id && !validate(id)) {
            return setErrorResponse(res, 400, "Invalid product ID format", null);
        }

        if (!id) {
            return setErrorResponse(res, 400, "Product ID is required", null);
        }

        try {
            const product = await this.productService.getProductById(id);
            return setSuccessResponse(res, 200, "success", product);
        } catch (error) {
            return setErrorResponse(res, 400, error.message, null);
        }
    }

    /**
     * Handles the /products endpoint for create product
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async createProduct(req, res) {
        const data = req.body;
        try {
            const createdProduct = await this.productService.createProduct(data);
            return setSuccessResponse(res, 200, "success", createdProduct);
        } catch (error) {
            return setErrorResponse(res, 500, error.message, null);
        }
    }

    /**
     * Handles the /products/:id endpoint for update product detail
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async updateProduct(req, res) {
        const { id } = req.params;
        const data = req.body;
        try {
            const updatedProduct = await this.productService.updateProduct(id, data);
            return setSuccessResponse(res, 200, "success", updatedProduct);
        } catch (error) {
            return setErrorResponse(res, 500, error.message, null);
        }
    }

    /**
     * Handles the /products/:id endpoint for deactivate / delete product
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const result = await this.productService.deleteProduct(id);
            return setSuccessResponse(res, 200, result.message, result);
        } catch (error) {
            return setErrorResponse(res, 500, error.message, null);
        }
    }
}

module.exports = ProductHandler;
