USE charityevents_db;

-- 插入类别数据
INSERT INTO categories (name, description) VALUES 
("Fun Runs", "Various fun running events, including color runs, mud runs, etc."),
('Dinner party', 'Formal charity dinner and fundraising event.'),
('Auction', 'Silent Auction and Live Auction Events.'),
('Music concert', 'Charity concert and live performance.' ),
('Art exhibition', 'Art show and creative workshop. '),
('Charity Sale Market', 'Handicrafts and Agricultural Products Sale.');

-- 插入活动数据·
INSERT INTO events (name, description, event_date, event_time, location, category_id, ticket_price, target_amount, current_amount, status) VALUES
('Children''s Charity Run', 'A 5-kilometer fun run to raise funds for the children''s hospital, suitable for the whole family.', '2025-10-15', '08:00:00', 'Central Park', 1, 50.00, 50000.00, 32500.00, 'active'),
('Charity Gala Dinner', 'Annual charity fundraising dinner with special guest speakers.', '2025-11-20', '19:00:00', 'Downtown Grand Hotel', 2, 200.00, 100000.00, 75000.00, 'active'),
('Silent Auction', 'Silent auction of artworks and collectibles, all proceeds donated to environmental organizations.', '2025-09-25', '18:30:00', 'Art Gallery', 3, 0.00, 80000.00, 45000.00, 'active'),
('Hope Concert', 'Charity concert by local bands to support youth music education programs.', '2025-12-05', '20:00:00', 'City Concert Hall', 4, 80.00, 60000.00, 28000.00, 'active'),
('Community Art Exhibition', 'Exhibition of works by local artists, sales proceeds support community art projects.', '2025-10-08', '10:00:00', 'Community Cultural Center', 5, 20.00, 30000.00, 12000.00, 'active'),
('Autumn Charity Market', 'Sale of handicrafts and agricultural products to support rural education development.', '2025-09-30', '09:00:00', 'City Hall Square', 6, 0.00, 40000.00, 18500.00, 'active'),
('Winter Charity Run', '10-kilometer winter charity run to raise funds for homeless shelters.', '2025-12-12', '09:30:00', 'Riverside Park', 1, 60.00, 70000.00, 15000.00, 'active'),
('New Year Charity Concert', 'Classical concert to welcome the New Year, supporting music therapy programs.', '2025-12-31', '21:00:00', 'Grand Theater', 4, 150.00, 90000.00, 35000.00, 'active');