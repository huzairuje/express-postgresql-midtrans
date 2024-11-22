const initializeCustomer = require('./customer');
const initializeProduct = require('./product');
const initializePayment = require('./payment');
const initializePaymentGatewayTransaction = require('./paymentGateway');

async function initializeModels(databaseClient) {
    const customerModel = await initializeCustomer(databaseClient);
    const productModel = await initializeProduct(databaseClient);
    const paymentModel = await initializePayment(databaseClient);
    const paymentGatewayModel = await initializePaymentGatewayTransaction(databaseClient);
    return {
        customerModel: customerModel,
        productModel: productModel,
        paymentModel: paymentModel,
        paymentGatewayModel: paymentGatewayModel,
    }
}

module.exports = initializeModels;