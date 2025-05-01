-- Schema for Itineraries
CREATE TABLE IF NOT EXISTS itineraries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(100) NOT NULL,
    duration INT NOT NULL
);

-- Seed data for Phuket and Krabi itineraries
INSERT INTO itineraries (name, region, duration) VALUES
('Phuket Getaway - 2 Nights', 'Phuket', 2),
('Phuket Adventure - 4 Nights', 'Phuket', 4),
('Krabi Explorer - 3 Nights', 'Krabi', 3),
('Krabi & Phuket Combo - 6 Nights', 'Krabi/Phuket', 6),
('Ultimate Thailand - 8 Nights', 'Phuket/Krabi', 8);