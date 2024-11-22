const { Sequelize } = require('sequelize');

let sequelizeInstance = null;
async function NewDatabaseClient() {
    if (sequelizeInstance) {
        return sequelizeInstance; // Return the existing instance
    }

    const host = process.env.postgres_host || 'localhost';
    const port = process.env.postgres_port || '5432';
    const user = process.env.postgres_user || 'postgres';
    const password = process.env.postgres_password || 'postgres';
    const dbName = process.env.postgres_dbname || 'coba';

    sequelizeInstance = new Sequelize(dbName, user, password, {
        host,
        port: parseInt(port, 10),
        dialect: 'postgres',
        pool: {
            max: parseInt(process.env.postgres_max_open_conn, 10) || 10,
            idle: parseInt(process.env.postgres_conn_lifetime, 10) || 5 * 60 * 1000,
            acquire: parseInt(process.env.postgres_max_idle_conn, 10) || 100000000,
        },
        logging: false,
    });

    try {
        await sequelizeInstance.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        throw error;
    }

    return sequelizeInstance;
}

module.exports = NewDatabaseClient;
