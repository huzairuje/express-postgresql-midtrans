const { Model, DataTypes } = require('sequelize');

class PaymentGatewayTransaction extends Model {}

function initializePaymentGatewayTransaction(sequelize) {
    PaymentGatewayTransaction.init(
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
            boundType: {
                type: DataTypes.STRING,
                allowNull: true,
                field: 'bound_type',
            },
            bodyJson: {
                type: DataTypes.JSON,
                allowNull: true,
                field: 'body_json',
            },
            expiredDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
                field: 'expired_date',
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
            modelName: 'PaymentGatewayTransaction',
            tableName: 'payment_gateway_transactions',
            timestamps: true,
            paranoid: true,
        }
    );
    return PaymentGatewayTransaction;
}

module.exports = initializePaymentGatewayTransaction;
