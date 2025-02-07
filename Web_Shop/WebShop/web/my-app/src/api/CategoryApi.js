const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // To parse incoming JSON requests

const port = 3000;

// Mock data
let categories = [
    { id: 1, name: 'Electronics', products: ['Phone', 'Laptop'] },
    { id: 2, name: 'Clothing', products: ['Shirt', 'Jeans'] }
];

// Utility function for finding a category by ID
const findCategoryById = (id) => categories.find(c => c.id === id);

// API routes

// Get all categories
app.get('/api/v1/categories', (req, res) => {
    res.json(categories);
});

// Get category by ID
app.get('/api/v1/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = findCategoryById(categoryId);

    if (!category) {
        return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
});

// Add a new category
app.post('/api/v1/categories', (req, res) => {
    const newCategory = req.body;

    if (!newCategory.name) {
        return res.status(400).json({ message: 'Category name is required' });
    }

    newCategory.id = categories.length + 1; // Simple ID generation
    categories.push(newCategory);

    res.status(201).json(newCategory);
});

// Update a category
app.put('/api/v1/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const updatedCategory = req.body;

    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    if (categoryIndex === -1) {
        return res.status(404).json({ message: 'Category not found' });
    }

    categories[categoryIndex] = { ...categories[categoryIndex], ...updatedCategory };
    res.status(204).end(); // No content
});

// Delete a category
app.delete('/api/v1/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id);

    const categoryIndex = categories.findIndex(c => c.id === categoryId);
    if (categoryIndex === -1) {
        return res.status(404).json({ message: 'Category not found' });
    }

    categories.splice(categoryIndex, 1);
    res.status(204).end(); // No content
});

app.listen(port, () => {
    console.log(`CategoryApi running at http://localhost:${port}`);
});
