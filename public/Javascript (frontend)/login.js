document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!email || !password) {
            errorMessage.textContent = "Please fill in both fields.";
            errorMessage.style.display = "block";
            return;
        }

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                window.location.href = "/profile"; // Redirect on successful login
            } else {
                errorMessage.textContent = data.message || "Invalid email or password.";
                errorMessage.style.display = "block";
            }
        } catch (error) {
            console.error("Error during login:", error);
            errorMessage.textContent = "Something went wrong. Please try again later.";
            errorMessage.style.display = "block";
        }
    });
});
