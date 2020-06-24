require('dotenv').config();

const config = {
    api: {
        dev: process.env.NODE_ENV || 'production',
        port: process.env.PORT || 3000,
    },
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
    },
    cors: process.env.CORS,
}

module.exports = config;