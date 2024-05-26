const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Define custom format for logs
const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'log/app.log' })
    ]
});

module.exports = logger;
