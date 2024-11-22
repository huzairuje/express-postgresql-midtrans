const {Op} = require("sequelize");

class ProductRepository {
    constructor(productModel) {
        this.productModel = productModel;
    }

    // Method to find customer by ID
    async findById(id) {
        return await this.productModel.findByPk(id);
    }

    async getAll(productName, limit, offset, orderBy, orderDirection) {
        try {
            // Validate inputs
            limit = Math.max(1, limit);
            offset = Math.max(0, offset);

            const queryOptions = {
                limit,
                offset,
                order: [[orderBy, orderDirection]],
            };

            if (productName) {
                queryOptions.where = {
                    name: {
                        [Op.iLike]: `%${productName}%`,
                    },
                };
            }
            return await this.productModel.findAndCountAll(queryOptions);
        } catch (error) {
            throw new Error(`Failed to retrieve products: ${error.message}`);
        }
    }


    // Method to create a new customer
    async createProduct(data) {
        return this.productModel.create(data);
    }

    // Method to update a customer's information
    async updateProduct(id, data) {
        const product = await this.findById(id);
        if (product) {
            return await product.save(data);
        }
        return null;
    }

    // Method to delete a customer
    async deleteProduct(id) {
        const product = await this.findById(id);
        if (product) {
            await product.destroy();
            return true;
        }
        return false;
    }
}

module.exports = ProductRepository;
