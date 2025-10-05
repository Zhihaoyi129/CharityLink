const express = require('express');
const router = express.Router();
const db = require('../event_db');

// 获取所有活动（用于首页）
router.get('/', async (req, res) => {
    try {
        const [events] = await db.execute(`
            SELECT e.*, c.name as category_name 
            FROM events e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE e.status = 'active' 
            ORDER BY e.event_date ASC
        `);
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// 搜索活动
router.get('/search', async (req, res) => {
    try {
        const { date, location, category } = req.query;
        
        let query = `
            SELECT e.*, c.name as category_name 
            FROM events e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE e.status = 'active'
        `;
        let params = [];

        if (date) {
            query += ` AND e.event_date = ?`;
            params.push(date);
        }
        if (location) {
            query += ` AND e.location LIKE ?`;
            params.push(`%${location}%`);
        }
        if (category) {
            query += ` AND c.name = ?`;
            params.push(category);
        }

        query += ` ORDER BY e.event_date ASC`;

        const [events] = await db.execute(query, params);
        res.json(events);
    } catch (error) {
        console.error('Error searching events:', error);
        res.status(500).json({ error: 'Failed to search events' });
    }
});

// 获取单个活动详情
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [events] = await db.execute(`
            SELECT e.*, c.name as category_name 
            FROM events e 
            LEFT JOIN categories c ON e.category_id = c.id 
            WHERE e.id = ?
        `, [id]);

        if (events.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(events[0]);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
});

module.exports = router;