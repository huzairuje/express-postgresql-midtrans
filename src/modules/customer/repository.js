class CustomerRepository {
    constructor(customerModel) {
        this.customerModel = customerModel;
    }

    // Method to find customer by ID
    async findById(id) {
        return await this.customerModel.findByPk(id);
    }

    // Method to find customer by username
    async findByUsername(username) {
        return await this.customerModel.findOne({ where: { username } });
    }

    // Method to create a new customer
    async createCustomer(data) {
        return this.customerModel.create(data);
    }

    // Method to update a customer's information
    async updateCustomer(id, data) {
        const customer = await this.findById(id);
        if (customer) {
            return await customer.save(data);
        }
        return null;
    }

    // Method to delete a customer
    async deleteCustomer(id) {
        const customer = await this.findById(id);
        if (customer) {
            await customer.destroy();
            return true;
        }
        return false;
    }
}

module.exports = CustomerRepository;
