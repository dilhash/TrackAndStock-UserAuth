const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 4001,
    databaseUrl: process.env.DATABASE_URL,
    sessionSecret: process.env.SESSION_SECRET,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4000'
};
