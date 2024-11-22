const { Model, DataTypes } = require('sequelize');

class Customer extends Model {}

function initializeCustomer(sequelize) {
    Customer.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Ensure uniqueness
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true, // Ensure uniqueness
                validate: {
                    isEmail: true, // Validate proper email format
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: true, // Optional
                field: 'firstname',
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: true, // Optional
                field: 'lastname',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: "created_at",
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                field: "updated_at",
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true, // Only set when the record is "soft deleted"
                field: "deleted_at",
            },
        },
        {
            sequelize,
            modelName: 'Customer',
            tableName: 'customers',
            timestamps: true, // Automatically manage `createdAt` and `updatedAt`
            paranoid: true, // Enables soft deletion via `deletedAt`
        }
    );
    return Customer;
}

module.exports = initializeCustomer;
