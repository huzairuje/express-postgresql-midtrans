const { setSuccessResponse, setErrorResponse } = require('../../infrastructure/httplib/httplib');

class CustomerHandler {
    constructor(customerService) {
        this.customerService = customerService;
    }

    /**
     * Sets up routes for customer-related endpoints
     * @param {import('express').Router} router - Express request object
     * @returns {import('express').Router}
     */
    setupRoutes(router) {
        router.post('/customer/register', this.registerCustomer.bind(this));
        router.post('/customer/login', this.loginCustomer.bind(this));
        router.get('/customer/profile', this.getCustomerInfo.bind(this));
        router.put('/customer/update', this.updateCustomer.bind(this));
        router.delete('/customer/deactivate', this.deactivateAccount.bind(this));
        router.post('/customer/reactivate', this.reactivateAccount.bind(this));
        return router;
    }

    /**
     * Handles the /register endpoint for customer registration
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async registerCustomer(req, res) {
        try {
            const customerData = req.body;
            const customer = await this.customerService.registerCustomer(customerData);
            return setSuccessResponse(res, 201, 'Customer registered successfully', customer);
        } catch (error) {
            return setErrorResponse(res, 500, error.message, null);
        }
    }

    /**
     * Handles the /login endpoint for customer login
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async loginCustomer(req, res) {
        try {
            const { username, password } = req.body;
            const result = await this.customerService.loginCustomer(username, password);
            return setSuccessResponse(res, 200, 'Login successful', result);
        } catch (error) {
            console.error('Error in loginCustomer:', error); // Log error
            return setErrorResponse(res, 400, error.message, null);
        }
    }

    /**
     * Handles the /me endpoint for getting customer details (protected route)
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async getCustomerInfo(req, res) {
        try {
            // Extract token from Authorization header
            const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
            if (!token) {
                return setErrorResponse(res, 401, 'Authorization token is required', null);
            }

            const customer = await this.customerService.getCustomerInfoFromToken(token);
            return setSuccessResponse(res, 200, 'Customer details fetched successfully', customer);
        } catch (error) {
            return setErrorResponse(res, 500, error.message, null);
        }
    }

    /**
     * Handles the /update endpoint to update customer details
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async updateCustomer(req, res) {
        try {
            const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
            if (!token) {
                return setErrorResponse(res, 401, 'Authorization token is required', null);
            }

            const { firstName, lastName, email, password } = req.body;

            // Get customer info from token
            const customer = await this.customerService.getCustomerInfoFromToken(token);

            // Update the fields
            const updatedCustomer = await this.customerService.updateCustomerProfile(customer.id, {
                firstName,
                lastName,
                email,
                password,
            });

            return setSuccessResponse(res, 200, 'Customer details updated successfully', updatedCustomer);
        } catch (error) {
            return setErrorResponse(res, 500, error.message, null);
        }
    }

    /**
     * Handles the /deactivate endpoint to deactivate customer account
     * @param {import('express').Request} req - Express request object
     * @param {import('express').Response} res - Express response object
     */
    async deactivateAccount(req, res) {
        try {
            const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
            if (!token) {
                return setErrorResponse(res, 401, 'Authorization token is required', null);
            }

            // Get customer info from token
            const customer = await this.customerService.getCustomerInfoFromToken(token);

            // Deactivate the account
            await this.customerService.deactivateAccount(customer.id);

            return setSuccessResponse(res, 200, 'Customer account deactivated successfully', null);
        } catch (error) {
            return setErrorResponse(res, 500, error.message, null);
        }
    }

    async reactivateAccount(req, res) {
        try {
            const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
            if (!token) {
                return setErrorResponse(res, 401, 'Authorization token is required', null);
            }

            // Get customer info from token
            const customer = await this.customerService.getCustomerInfoFromToken(token);

            // Reactivate the account
            await this.customerService.reactivateAccount(customer.id);

            return setSuccessResponse(res, 200, 'Customer account reactivated successfully', null);
        } catch (error) {
            return setErrorResponse(res, 500, error.message, null);
        }
    }
}

module.exports = CustomerHandler;
