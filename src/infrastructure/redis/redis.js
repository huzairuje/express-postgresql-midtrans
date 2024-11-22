const Redis = require('ioredis');

class RedisLib {
    constructor(redisClient) {
        this.redisClient = redisClient;
    }

    // Initialize Redis connection
    static async init() {
        const hostRedis = process.env.redis_host || 'localhost';
        const portRedis = parseInt(process.env.redis_port || '6379', 10);
        const dbRedis = parseInt(process.env.redis_db || '0', 10);

        const redisClient = new Redis({
            host: hostRedis,
            port: portRedis,
            password: process.env.redis_password,
            db: dbRedis,
        });

        // Test Redis connection
        try {
            await redisClient.ping();
            console.log(`Connected to RedisLib on ${hostRedis} (DB: ${dbRedis})`);
            return new RedisLib(redisClient);
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            throw error;
        }
    }

    static async initClient() {
        const hostRedis = process.env.redis_host || 'localhost';
        const portRedis = parseInt(process.env.redis_port || '6379', 10);
        const dbRedis = parseInt(process.env.redis_db || '0', 10);

        const redisClient = new Redis({
            host: hostRedis,
            port: portRedis,
            password: process.env.redis_password,
            db: dbRedis,
        });

        // Test Redis connection
        try {
            await redisClient.ping();
            console.log(`Connected to Redis Client on ${hostRedis} (DB: ${dbRedis})`);
            return redisClient;
        } catch (error) {
            console.error('Failed to connect to Redis:', error);
            throw error;
        }
    }

    // Set idempotency key if not exists
    async setIdempotencyKey(key, value, ttl) {
        const existingValue = await this.redisClient.get(key);
        if (existingValue) {
            throw new Error('Key already exists in cache');
        }

        const success = await this.redisClient.setnx(key, value);
        if (!success) {
            throw new Error('Failed to set idempotency key');
        }

        await this.redisClient.expire(key, ttl);
    }

    // Delete a key if it exists
    async deleteKey(key) {
        const value = await this.redisClient.get(key);
        if (value) {
            await this.redisClient.del(key);
        }
    }

    // Get the value for a given key
    async get(key) {
        return this.redisClient.get(key);
    }

    // Set a key with a TTL
    async set(key, value, ttl) {
        await this.redisClient.set(key, value, 'EX', ttl);
    }
}

module.exports = RedisLib;