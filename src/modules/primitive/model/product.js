const { Model, DataTypes } = require('sequelize');

class Product extends Model {}

function initializeProduct(sequelize) {
    Product.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Ensure uniqueness
                field: 'name',
            },
            price: {
                type: DataTypes.FLOAT, // Allow decimal values for price
                allowNull: false,
                validate: {
                    min: 0, // Ensure price is non-negative
                },
                field: 'price',
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0, // Default quantity is 0
                validate: {
                    min: 0, // Ensure quantity is non-negative
                },
                field: 'quantity',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: 'updated_at',
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true, // Only set when the record is "soft deleted"
                field: 'deleted_at',
            },
        },
        {
            sequelize,
            modelName: 'Product',
            tableName: 'products',
            timestamps: true, // Automatically manage `createdAt` and `updatedAt`
            paranoid: true, // Enables soft deletion via `deletedAt`
        }
    );
    return Product;
}

module.exports = initializeProduct;
