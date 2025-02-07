const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // To parse incoming JSON requests

const port = 3000;

// Mock data for orders
let orders = [
    { id: 1, customerName: 'John Doe', totalAmount: 100, status: 'Completed' },
    { id: 2, customerName: 'Jane Smith', totalAmount: 200, status: 'Pending' }
];

// Utility function for finding an order by ID
const findOrderById = (id) => orders.find(order => order.id === id);

// API routes

// Get all orders
app.get('/api/v1/orders', (req, res) => {
    res.json(orders);
});

// Get order by ID
app.get('/api/v1/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = findOrderById(orderId);

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
});

// Add a new order
app.post('/api/v1/orders', (req, res) => {
    const newOrder = req.body;

    if (!newOrder.customerName || !newOrder.totalAmount || !newOrder.status) {
        return res.status(400).json({ message: 'Order data is incomplete' });
    }

    newOrder.id = orders.length + 1; // Simple ID generation
    orders.push(newOrder);

    res.status(201).json(newOrder);
});

// Update an order
app.put('/api/v1/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const updatedOrder = req.body;

    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }

    orders[orderIndex] = { ...orders[orderIndex], ...updatedOrder };
    res.status(204).end(); // No content
});

// Delete an order
app.delete('/api/v1/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);

    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }

    orders.splice(orderIndex, 1);
    res.status(204).end(); // No content
});

app.listen(port, () => {
    console.log(`OrderApi running at http://localhost:${port}`);
});
