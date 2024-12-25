const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "CarRental"
});

// Get available cars
app.get("/api/cars", (req, res) => {
    db.query("SELECT Cars.id, model, year, price, description, is_available, type_name AS type FROM Cars JOIN CarTypes ON Cars.type_id = CarTypes.id WHERE is_available = TRUE", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Get all bookings
app.get("/api/bookings", (req, res) => {
    db.query("SELECT Bookings.id, rental_period, total_price, customer_name, model AS car_model FROM Bookings JOIN Cars ON Bookings.car_id = Cars.id", (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Make a booking
app.post("/api/bookings", (req, res) => {
    const { car_id, rental_period, customer_name } = req.body;

    // Fetch car price to calculate total
    db.query("SELECT price, model FROM Cars WHERE id = ?", [car_id], (err, results) => {
        if (err) throw err;
        const price = results[0].price;
        const total_price = price * rental_period;
        const car_model = results[0].model;

        // Insert booking into the database
        db.query(
            "INSERT INTO Bookings (car_id, rental_period, total_price, customer_name) VALUES (?, ?, ?, ?)",
            [car_id, rental_period, total_price, customer_name],
            (err) => {
                if (err) throw err;
                // Mark the car as booked
                db.query("UPDATE Cars SET is_available = FALSE WHERE id = ?", [car_id], (err) => {
                    if (err) throw err;
                    res.sendStatus(200);
                });
            }
        );
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
