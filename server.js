const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const cors = require('cors');
const config = require('./config'); // Import configuration
const logger = require('./logger'); // Import logger

const initializePassport = require('./passport-config');
const User = require('./models/User'); // Import the User model

initializePassport(
    passport,
    async email => await User.findOne({ email: email }),
    async id => await User.findById(id)
);

// Connect to MongoDB
mongoose.connect(config.databaseUrl);
const db = mongoose.connection;
db.on('error', error => logger.error(`MongoDB connection error: ${error}`));
db.once('open', () => logger.info('Connected to MongoDB'));

// Configure CORS
app.use(cors({
    origin: config.frontendUrl,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    logger.info('Welcome endpoint hit');
    res.send('Welcome to the backend');
});

app.listen(config.port, () => {
    logger.info(`Backend server started on port ${config.port}`);
});
