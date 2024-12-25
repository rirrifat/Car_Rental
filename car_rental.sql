-- Create the Car Rental Database
CREATE DATABASE IF NOT EXISTS CarRental;

USE CarRental;

-- Create a table for car types (e.g., sedan, SUV, convertible)
CREATE TABLE IF NOT EXISTS CarTypes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL
);

-- Insert some car types
INSERT INTO CarTypes (type_name) VALUES ('Sedan'), ('SUV'), ('Convertible'), ('Luxury');

-- Create a table for cars
CREATE TABLE IF NOT EXISTS Cars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    year INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    type_id INT NOT NULL,
    description TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (type_id) REFERENCES CarTypes(id)
);

-- Insert sample cars
INSERT INTO Cars (model, year, price, type_id, description, is_available)
VALUES 
('Toyota Camry', 2020, 50.00, 1, 'A comfortable sedan for city driving.', TRUE),
('Honda Civic', 2019, 45.00, 1, 'Reliable sedan with great fuel efficiency.', TRUE),
('Ford Mustang', 2021, 75.00, 3, 'Sporty and powerful convertible.', TRUE),
('Chevrolet Malibu', 2022, 65.00, 1, 'Spacious sedan with advanced tech features.', TRUE),
('Tesla Model X', 2021, 120.00, 2, 'Luxury electric SUV with autopilot.', TRUE),
('BMW 5 Series', 2021, 100.00, 4, 'Luxury sedan with premium features.', TRUE);

-- Create a table for rental bookings
CREATE TABLE IF NOT EXISTS Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    car_id INT NOT NULL,
    rental_period INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    FOREIGN KEY (car_id) REFERENCES Cars(id)
);

-- Sample booking data
INSERT INTO Bookings (car_id, rental_period, total_price, customer_name)
VALUES
(1, 5, 250.00, 'John Doe'),
(2, 3, 135.00, 'Jane Smith');
