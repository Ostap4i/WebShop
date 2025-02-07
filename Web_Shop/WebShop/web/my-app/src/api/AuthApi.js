const express = require('express');
const AuthService = require('./services/AuthService');
const router = express.Router();

// Реєстрація користувача
router.post('/register', async (req, res) => {
    try {
        const authResponse = await AuthService.register(req.body);
        res.status(200).json(authResponse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Логін користувача
router.post('/login', async (req, res) => {
    try {
        const authResponse = await AuthService.login(req.body);
        res.status(200).json(authResponse);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// Вихід
router.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Ви вийшли з системи' });
});

module.exports = router;
