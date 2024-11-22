class HealthService {
    constructor(repository, redisClient) {
        this.repository = repository;
        this.redisClient = redisClient;
    }

    async checkUpTime() {
        let dbStatus = 'healthy';
        let redisStatus = 'healthy';

        // Check database health
        try {
            await this.repository.checkUpTimeDB();
        } catch (err) {
            console.error("Database uptime check failed:", err.message);
            dbStatus = 'unhealthy';
        }

        // Check Redis health
        try {
            await this.redisClient.ping();
        } catch (err) {
            console.error("Redis uptime check failed:", err.message);
            redisStatus = 'unhealthy';
        }

        return {
            redis: redisStatus,
            db: dbStatus,
        };
    }
}

module.exports = HealthService;
