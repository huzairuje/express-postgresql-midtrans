const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Assuming you have some JWT secret stored in environment variables
const JWT_SECRET = process.env.jwt_secret || "SecretKey911902839123";

class CustomerService {
    constructor(customerRepository) {
        this.customerRepo = customerRepository;
    }

    // Method to register a customer
    async registerCustomer(data) {
        const { username, password, firstname, lastname, email } = data;

        // Check if username or email already exists
        const existingCustomer = await this.customerRepo.findByUsername(username);
        if (existingCustomer) {
            throw new Error('Username is already taken');
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the customer record
        const customer = await this.customerRepo.createCustomer({
            username,
            password: hashedPassword,
            firstname,
            lastname,
            email
        });

        // Return the newly created customer (excluding the password)
        return {
            id: customer.id,
            username: customer.username,
            firstname: customer.firstName,
            lastname: customer.lastName,
            email: customer.email
        };
    }

    // Method to log in a customer by username
    async loginCustomer(username, password) {
        const customer = await this.customerRepo.findByUsername(username);
        if (!customer) {
            throw new Error('Invalid username or password');
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }

        const token = jwt.sign({ id: customer.id, username: customer.username }, JWT_SECRET, { expiresIn: '1h' });

        return {
            token
        };
    }

    // Method to get customer info by decoding JWT token
    async getCustomerInfoFromToken(token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const customer = await this.customerRepo.findById(decoded.id);
            if (!customer) {
                throw new Error('Customer not found');
            }

            return {
                id: customer.id,
                username: customer.username,
                firstname: customer.firstname,
                lastname: customer.lastname,
                email: customer.email
            };
        } catch (err) {
            throw new Error('Invalid or expired token');
        }
    }

    // Method to update customer profile
    async updateCustomerProfile(id, updates) {
        const { firstName, lastName, email, password, newPassword } = updates;

        // Find customer by ID
        const customer = await this.customerRepo.findById(id);
        if (!customer) {
            throw new Error('Customer not found');
        }

        // Update first name, last name, or email if provided
        if (firstName) customer.firstname = firstName;
        if (lastName) customer.lastname = lastName;
        if (email) customer.email = email;

        // If password change is requested
        if (password && newPassword) {
            const isMatch = await bcrypt.compare(password, customer.password);
            if (!isMatch) {
                throw new Error('Current password is incorrect');
            }

            // Hash the new password
            customer.password = await bcrypt.hash(newPassword, 10);
        }

        // Save updated customer data
        await this.customerRepo.updateCustomer(id, customer);

        return {
            id: customer.id,
            username: customer.username,
            firstname: customer.firstname,
            lastname: customer.lastname,
            email: customer.email
        };
    }

    async deactivateAccount(customerId) {
        // Find the customer by ID
        const customer = await this.customerRepo.findById(customerId);
        if (!customer) {
            throw new Error('Customer not found');
        }

        // Soft-delete the customer (sets deletedAt)
        await this.customerRepo.deleteCustomer(customer.id);
    }

    // Method to reactivate a customer's account
    async reactivateAccount(customerId) {
        // Find the soft-deleted customer
        const customer = await this.customerRepo.findById(customerId, { paranoid: false });
        if (!customer) {
            throw new Error('Customer not found or account is already active');
        }

        // Restore the soft-deleted record
        await customer.restore();
    }

}

module.exports = CustomerService;
