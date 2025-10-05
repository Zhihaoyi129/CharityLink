const express = require('express');
const router = express.Router();
const db = require('../event_db');

// 获取所有类别
router.get('/', async (req, res) => {
    try {
        const [categories] = await db.execute('SELECT * FROM categories ORDER BY name');
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

module.exports = router;