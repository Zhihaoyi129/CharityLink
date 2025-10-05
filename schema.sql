-- 删除并重新创建数据库（确保干净的环境）
DROP DATABASE IF EXISTS charityevents_db;
CREATE DATABASE charityevents_db;
USE charityevents_db;

-- 创建类别表
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建活动表
CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    location VARCHAR(255) NOT NULL,
    category_id INT,
    ticket_price DECIMAL(10,2) DEFAULT 0.00,
    target_amount DECIMAL(10,2),
    current_amount DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('active', 'ended', 'suspended') DEFAULT 'active',
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 创建索引以提高查询性能
CREATE INDEX idx_event_date ON events(event_date);
CREATE INDEX idx_event_status ON events(status);
CREATE INDEX idx_event_location ON events(location);