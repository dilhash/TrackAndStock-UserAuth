const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const logger = require('../logger'); // Import logger

router.post('/register', async (req, res) => {
    const { givenName, familyName, email, mobileNumber, password, state, postcode } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            logger.warn(`Registration attempt with existing email: ${email}`);
            return res.status(400).json({ message: 'Email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            givenName,
            familyName,
            email,
            mobileNumber,
            password: hashedPassword,
            state,
            postcode
        });
        await newUser.save();
        logger.info(`User registered: ${email}`);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        logger.error(`Error registering user: ${error}`);
        res.status(500).json({ message: 'Error registering user', error });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            logger.error(`Authentication error: ${err}`);
            return res.status(500).json({ message: 'Authentication failed', err });
        }
        if (!user) {
            logger.warn(`Login attempt failed: ${info.message}`);
            return res.status(400).json({ message: info.message });
        }
        req.login(user, (err) => {
            if (err) {
                logger.error(`Login error: ${err}`);
                return res.status(500).json({ message: 'Login failed', err });
            }
            logger.info(`User logged in: ${user.email}`);
            res.json({ user });
        });
    })(req, res, next);
});

module.exports = router;
