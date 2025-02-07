const express = require('express');
const BrandService = require('../services/BrandService');
const router = express.Router();

// Отримання всіх брендів
router.get('/all', async (req, res) => {
    try {
        const brands = await BrandService.getAllBrands();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Отримання бренду за ідентифікатором
router.get('/:id', async (req, res) => {
    try {
        const brand = await BrandService.getBrandById(req.params.id);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Додавання нового бренду
router.post('/add', async (req, res) => {
    try {
        const newBrand = await BrandService.addBrand(req.body);
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Оновлення бренду
router.put('/:id', async (req, res) => {
    try {
        const updatedBrand = await BrandService.updateBrand(req.params.id, req.body);
        if (!updatedBrand) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(200).json(updatedBrand);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Видалення бренду
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await BrandService.deleteBrand(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: 'Brand not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
