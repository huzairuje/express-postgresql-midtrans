const NewDatabaseClient  = require('../infrastructure/database/postgresql');
const initializeModels = require('../modules/primitive/model/init');
const RedisLib  = require('../infrastructure/redis/redis');
const RateLimiter = require('../infrastructure/limiter/limiter');
const HealthHandler = require('../modules/health/handler');
const HealthService = require('../modules/health/service');
const HealthRepository = require('../modules/health/repository');
const CustomerHandler = require('../modules/customer/handler');
const CustomerService = require('../modules/customer/service');
const CustomerRepository = require('../modules/customer/repository');
const ProductHandler = require('../modules/product/handler');
const ProductService = require('../modules/product/service');
const ProductRepository = require('../modules/product/repository');
const initiateMidtransCoreApi = require('../infrastructure/client/midtrans/midtrans');

async function initializeHandlers() {
    // Initialize Redis client
    let redisLib;
    let redisClient;
    try {
        redisLib = await RedisLib.init();
        redisClient = await RedisLib.initClient();
    } catch (err) {
        console.error("Failed to initialize Redis client", err);
        process.exit(1);
    }

    // Initialize PostgreSQL client
    let dbHandler;
    try {
        dbHandler = await NewDatabaseClient();
    } catch (err) {
        console.error("Failed to initialize database client", err);
        process.exit(1);
    }

    //init model
    let allModels;
    try {
        allModels = await initializeModels(dbHandler);
    } catch (err) {
        console.error("Failed to initialize Model client", err);
    }

    //init midtrans
    let midtransClientSDK;
    try {
        midtransClientSDK = await initiateMidtransCoreApi();
    } catch (err) {
        console.error("Failed to initialize midtrans client", err);
    }

    console.log(midtransClientSDK);

    // Setup Rate Limiter with environment variables or defaults
    const defaultRate = 100;
    const defaultInterval = 1000;
    const rate = parseInt(process.env.rate || `${defaultRate}`, 10);
    const interval = parseInt(process.env.interval || `${defaultInterval}`, 10);
    const limiter = new RateLimiter(rate, interval);

    // Initialize Health module
    const healthRepository = new HealthRepository(dbHandler);
    const healthService = new HealthService(healthRepository, redisClient);
    const healthHandler = new HealthHandler(healthService);

    // Initialize Customer module
    const customerRepository = new CustomerRepository(allModels.customerModel);
    const customerService = new CustomerService(customerRepository);
    const customerHandler = new CustomerHandler(customerService);

    // Initialize Product module
    const productRepository = new ProductRepository(allModels.productModel);
    const productService = new ProductService(productRepository);
    const productHandler = new ProductHandler(productService);

    // Initialize Payment module

    // Initialize Payment Gateway module

    return {
        limiter,
        healthHandler,
        customerHandler,
        productHandler,
    };
}

module.exports = initializeHandlers;
