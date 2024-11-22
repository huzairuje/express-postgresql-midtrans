const midtransClient = require('midtrans-client');

/**
 * Initializes the Midtrans Core API client.
 * @returns {midtransClient.CoreApi} - The initialized CoreApi client.
 */
function initiateMidtransCoreApi() {
    let isProduction = process.env.NODE_ENV === 'production' || false;
    let serverKey = process.env.server_key_midtrans;
    let clientKey = process.env.client_key_midtrans;

    if (!serverKey || !clientKey) {
        throw new Error('Both serverKey and clientKey are required to initialize Midtrans');
    }

    return new midtransClient.CoreApi({
        isProduction: isProduction || false,
        serverKey,
        clientKey,
    });
}

module.exports = initiateMidtransCoreApi;
