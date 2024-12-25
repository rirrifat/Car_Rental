document.addEventListener("DOMContentLoaded", function() {
    fetchCars();
    fetchBookings();

    // Fetch available cars
    async function fetchCars() {
        const response = await fetch("/api/cars");
        const cars = await response.json();

        const carSelect = document.getElementById("car-id");
        const carsList = document.getElementById("cars-list");

        // Populate car options and list
        cars.forEach(car => {
            const carOption = document.createElement("option");
            carOption.value = car.id;
            carOption.textContent = `${car.model} (${car.year}) - $${car.price}/day`;
            carSelect.appendChild(carOption);

            const carItem = document.createElement("div");
            carItem.classList.add("car-item");
            carItem.innerHTML = `
                <h3>${car.model} (${car.year})</h3>
                <p>Price per day: $${car.price}</p>
                <p>Type: ${car.type}</p>
                <p>Description: ${car.description}</p>
                <p>Status: ${car.is_available ? "Available" : "Booked"}</p>
            `;
            carsList.appendChild(carItem);
        });
    }

    // Fetch rental bookings
    async function fetchBookings() {
        const response = await fetch("/api/bookings");
        const bookings = await response.json();

        const rentalList = document.getElementById("rental-list");
        rentalList.innerHTML = "";

        bookings.forEach(booking => {
            const rentalItem = document.createElement("li");
            rentalItem.textContent = `Customer: ${booking.customer_name}, Car: ${booking.car_model}, Rental Period: ${booking.rental_period} days, Total: $${booking.total_price}`;
            rentalList.appendChild(rentalItem);
        });
    }

    // Handle booking form submission
    const bookingForm = document.getElementById("booking-form");
    bookingForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const carId = document.getElementById("car-id").value;
        const rentalPeriod = document.getElementById("rental-period").value;
        const customerName = document.getElementById("customer-name").value;

        const response = await fetch("/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                car_id: carId,
                rental_period: rentalPeriod,
                customer_name: customerName
            })
        });

        if (response.ok) {
            fetchBookings(); // Refresh the bookings list
            alert("Booking successful!");
        } else {
            alert("Failed to make a booking. Try again!");
        }
    });
});
