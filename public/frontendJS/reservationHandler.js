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

            // Parse time
            const [timeValue, modifier] = time.split(" ");
            let [hours, minutes] = timeValue.split(":");
            hours = parseInt(hours, 10);
            minutes = parseInt(minutes || 0, 10);

            // Convert to 24h format
            if (modifier === "PM" && hours !== 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;

            if (isNaN(month) || isNaN(day) || isNaN(hours) || isNaN(minutes)) {
                alert("Invalid date or time. Please check your inputs.");
                return;
            }

            // Create dates (month is 0-based!)
            const year = new Date().getFullYear();
            const startDate = new Date(year, parseInt(month, 10) - 1, parseInt(day, 10), hours, minutes);
            duration = 30;
            //const endDate = new Date(startDate.getTime() + duration * 60000); // 30 mins

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                alert("Invalid date format. Please try again.");
                return;
            }
            
            // Debugging logs
            console.log("Start Date:", startDate);
            console.log("End Date:", endDate);

            // Debug logs (optional)
            console.log("Frontend Date Values:", {
                building,
                room,
                month: parseInt(month) - 1,
                day,
                hours,
                minutes,
                startDate,
                endDate
            });

            try {
                const response = await fetch("/api/seats/reserve", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        lab: room,
                        seat: "A1", // Temporary - replace with seat selection logic
                        resDate: startDate.toISOString(),
                        //endDate: endDate.toISOString()
                        duration,
                        anon: false // Assuming default, adjust if needed
                    })
                });

                const result = await response.json();
                if (response.ok) {
                    window.location.href = "/profile";
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error("Reservation failed:", error);
                alert("Failed to make reservation. Please try again.");
            }
        });
    }
});