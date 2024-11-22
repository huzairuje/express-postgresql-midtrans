class ProductService {
    constructor(productModel) {
        this.productRepository = productModel;
    }

    // Method to get all products with optional filtering by name and pagination
    async getAllProducts(productName = "", limit = 10, offset = 0, orderBy = "created_at", orderDirection = "asc") {
        try {
            // Fetch products from the repository
            const result = await this.productRepository.getAll(productName, limit, offset, orderBy, orderDirection);
            return {
                products: result.rows || [],
                totalCount: result.count || 0,
            };
        } catch (error) {
            throw new Error(`Error retrieving products: ${error.message}`);
        }
    }

    // Method to find a product by ID
    async getProductById(id) {
        try {
            const product = await this.productRepository.findById(id);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Error retrieving product: ${error.message}`);
        }
    }

    // Method to create a new product
    async createProduct(data) {
        try {
            return await this.productRepository.createProduct(data);
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    // Method to update an existing product
    async updateProduct(id, data) {
        try {
            const updatedProduct = await this.productRepository.updateProduct(id, data);
            if (!updatedProduct) {
                throw new Error('Product not found or failed to update');
            }
            return updatedProduct;
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    // Method to delete a product by ID
    async deleteProduct(id) {
        try {
            const result = await this.productRepository.deleteProduct(id);
            if (!result) {
                throw new Error('Product not found or failed to delete');
            }
            return { message: 'Product deleted successfully' };
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }
}

module.exports = ProductService;
