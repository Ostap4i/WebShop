const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // To parse incoming JSON requests

const port = 3000;

// Mock data for OrderItems
let orderItems = [
    { id: 1, orderId: 1, productId: 1, quantity: 2, price: 50.0 },
    { id: 2, orderId: 1, productId: 2, quantity: 1, price: 100.0 }
];

// Mock data for Orders and Products (needed for relationships)
const orders = [
    { id: 1, customerName: 'John Doe', totalAmount: 150 }
];

const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' }
];

// Utility function for finding orderItem by ID
const findOrderItemById = (id) => orderItems.find(item => item.id === id);

// API routes

// Get all order items
app.get('/api/v1/orderitems', (req, res) => {
    res.json(orderItems);
});

// Get order item by ID
app.get('/api/v1/orderitems/:id', (req, res) => {
    const orderItemId = parseInt(req.params.id);
    const orderItem = findOrderItemById(orderItemId);

    if (!orderItem) {
        return res.status(404).json({ message: 'OrderItem not found' });
    }

    res.json(orderItem);
});

// Add a new order item
app.post('/api/v1/orderitems', (req, res) => {
    const newOrderItem = req.body;

    if (!newOrderItem.orderId || !newOrderItem.productId || !newOrderItem.quantity || !newOrderItem.price) {
        return res.status(400).json({ message: 'Incomplete order item data' });
    }

    newOrderItem.id = orderItems.length + 1; // Simple ID generation
    orderItems.push(newOrderItem);

    res.status(201).json(newOrderItem);
});

// Update an order item
app.put('/api/v1/orderitems/:id', (req, res) => {
    const orderItemId = parseInt(req.params.id);
    const updatedOrderItem = req.body;

    const orderItemIndex = orderItems.findIndex(item => item.id === orderItemId);
    if (orderItemIndex === -1) {
        return res.status(404).json({ message: 'OrderItem not found' });
    }

    orderItems[orderItemIndex] = { ...orderItems[orderItemIndex], ...updatedOrderItem };
    res.status(204).end(); // No content
});

// Delete an order item
app.delete('/api/v1/orderitems/:id', (req, res) => {
    const orderItemId = parseInt(req.params.id);

    const orderItemIndex = orderItems.findIndex(item => item.id === orderItemId);
    if (orderItemIndex === -1) {
        return res.status(404).json({ message: 'OrderItem not found' });
    }

    orderItems.splice(orderItemIndex, 1);
    res.status(204).end(); // No content
});

app.listen(port, () => {
    console.log(`OrderItemApi running at http://localhost:${port}`);
});
