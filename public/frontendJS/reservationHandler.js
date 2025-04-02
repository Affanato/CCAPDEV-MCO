document.addEventListener("DOMContentLoaded", function () {
    const reservationForm = document.getElementById("reservation-forms");

    if (reservationForm) {
        reservationForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Get form values
            const building = document.getElementById("building").value;
            const room = document.getElementById("room").value;
            const month = document.getElementById("month").value;
            const day = document.getElementById("day").value;
            const time = document.getElementById("time").value;

            try {
                // Check if a seat is selected
                const selectedSeat = document.querySelector("#seat-form .selected");
                if (!selectedSeat) {
                    throw new Error("Please select a seat first");
                }

                // Get the index of the selected seat to determine its number
                const allSeats = document.querySelectorAll("#seat-form input[type='button']");
                const seatIndex = Array.from(allSeats).indexOf(selectedSeat);
                const seatNumber = `A${seatIndex + 1}`;

                // Parse time more robustly
                const [timeValue, modifier] = time.split(" ");
                let [hours, minutes] = timeValue.split(":");
                hours = parseInt(hours);
                minutes = parseInt(minutes || 0);

                // Validate time components
                if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 12 || minutes < 0 || minutes > 59) {
                    throw new Error("Invalid time format");
                }

                // Convert to 24h format
                if (modifier === "PM" && hours < 12) hours += 12;
                if (modifier === "AM" && hours === 12) hours = 0;

                // Create date object (ensure month and day are valid)
                const year = new Date().getFullYear();
                const monthNum = parseInt(month);
                const dayNum = parseInt(day);

                // Validate month and day
                if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
                    throw new Error("Invalid month");
                }
                if (isNaN(dayNum) || dayNum < 1 || dayNum > 31) {
                    throw new Error("Invalid day");
                }

                // Create the date objects
                const startDate = new Date(year, monthNum - 1, dayNum, hours, minutes);

                // Validate the created date
                if (isNaN(startDate.getTime())) {
                    throw new Error("Invalid date combination");
                }

                const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 mins

                const response = await fetch("/api/seats/reserve", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        lab: room,
                        seat: seatNumber,
                        resDate: startDate.toISOString(),
                        endDate: endDate.toISOString(),
                        duration: 30
                    })
                });

                const result = await response.json();
                if (response.ok) {
                    // Mark the seat as reserved before redirecting
                    selectedSeat.classList.remove("selected");
                    selectedSeat.classList.add("reserved");
                    window.location.href = "/profile";
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error("Reservation failed:", error);
                alert("Failed to make reservation: " + error.message);
            }
        });
    }
});
