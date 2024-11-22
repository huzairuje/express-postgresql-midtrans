const { Model, DataTypes } = require('sequelize');

class Payment extends Model {}

function initializePayment(sequelize) {
    Payment.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            customerId: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'customer_id',
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: true,
                field: 'product_id',
            },
            currency: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'currency',
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'status',
            },
            amount: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: 'amount',
            },
            type: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'type',
            },
            thirdParty: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'third_party',
            },
            referenceId: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'reference_id',
            },
            actions: {
                type: DataTypes.JSON,
                allowNull: true,
                field: 'actions',
            },
            channelCode: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'channel_code',
            },
            finalAmount: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: 'final_amount',
            },
            createdBy: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'created_by',
            },
            updatedBy: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'updated_by',
            },
            expiredDate: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'expired_date',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at',
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'deleted_at',
            },
        },
        {
            sequelize,
            modelName: 'Payment',
            tableName: 'payments',
            timestamps: true, // Enable `createdAt` and `updatedAt`
            paranoid: true,  // Enable `deletedAt` for soft deletion
        }
    );
    return Payment;
}

module.exports = initializePayment;
