const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 导入路由
const eventRoutes = require('./routes/events');
const categoryRoutes = require('./routes/categories');

// 导入错误处理中间件
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api/events', eventRoutes);
app.use('/api/categories', categoryRoutes);

// 根路径
app.get('/', (req, res) => {
    res.json({ 
        message: 'Charity Events API is running!',
        endpoints: {
            events: '/api/events',
            categories: '/api/categories'
        }
    });
});

// 错误处理中间件
app.use(errorHandler);

// 404处理
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});