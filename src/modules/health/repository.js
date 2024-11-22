// healthRepository.js
const { Sequelize } = require('sequelize');

class HealthRepository {
    /**
     * @param {Sequelize} db - Sequelize instance
     */
    constructor(db) {
        this.db = db;
    }

    /**
     * Checks the uptime of the database by attempting to authenticate.
     * @returns {Promise<void>}
     * @throws {Error} If the database connection check fails
     */
    async checkUpTimeDB() {
        try {
            await this.db.authenticate(); // Verifies the connection
            console.log("Database is healthy");
        } catch (error) {
            throw new Error(`Database check failed: ${error.message}`);
        }
    }
}

module.exports = HealthRepository;