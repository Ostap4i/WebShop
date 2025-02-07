const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // To parse incoming JSON requests

const port = 3000;

// Mock data for Users and Products
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', passwordHash: 'hashedPassword1', buyList: [], wishList: [] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', passwordHash: 'hashedPassword2', buyList: [], wishList: [] }
];

let products = [
    { id: 1, title: 'Product 1', description: 'Description of product 1', price: 20.0 },
    { id: 2, title: 'Product 2', description: 'Description of product 2', price: 30.0 }
];

// Utility functions to simulate database actions

const findUserById = (id) => users.find(user => user.id === id);
const findProductById = (id) => products.find(product => product.id === id);

// API routes

// Get user by ID
app.get('/api/v1/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = findUserById(userId);
    if (!user) {
        return res.status(404).json({ message: `User with ID ${userId} not found.` });
    }
    res.json(user);
});

// Create a new user
app.post('/api/v1/users', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Invalid user data.' });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        passwordHash: `hashed${password}`,  // Simulating password hashing
        buyList: [],
        wishList: []
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Update user
app.put('/api/v1/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: `User with ID ${userId} not found.` });
    }

    users[userIndex] = { ...users[userIndex], name, email };
    res.status(204).end(); // No content
});

// Delete user
app.delete('/api/v1/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ message: `User with ID ${userId} not found.` });
    }

    users.splice(userIndex, 1);
    res.status(204).end(); // No content
});

// Add product to buy list
app.post('/api/v1/users/:userId/buylist/:productId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const productId = parseInt(req.params.productId);

    const user = findUserById(userId);
    const product = findProductById(productId);

    if (!user) {
        return res.status(404).json({ message: `User with ID ${userId} not found.` });
    }
    if (!product) {
        return res.status(404).json({ message: `Product with ID ${productId} not found.` });
    }

    user.buyList.push(product);
    res.status(200).json({ message: 'Product successfully added to buy list.' });
});

// Add product to wish list
app.post('/api/v1/users/:userId/wishlist/:productId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const productId = parseInt(req.params.productId);

    const user = findUserById(userId);
    const product = findProductById(productId);

    if (!user) {
        return res.status(404).json({ message: `User with ID ${userId} not found.` });
    }
    if (!product) {
        return res.status(404).json({ message: `Product with ID ${productId} not found.` });
    }

    user.wishList.push(product);
    res.status(200).json({ message: 'Product successfully added to wish list.' });
});

// Get buy list for user
app.get('/api/v1/users/:userId/buylist', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = findUserById(userId);

    if (!user) {
        return res.status(404).json({ message: `User with ID ${userId} not found.` });
    }

    res.json(user.buyList);
});

// Get wish list for user
app.get('/api/v1/users/:userId/wishlist', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = findUserById(userId);

    if (!user) {
        return res.status(404).json({ message: `User with ID ${userId} not found.` });
    }

    res.json(user.wishList);
});

app.listen(port, () => {
    console.log(`UserApi running at http://localhost:${port}`);
});
