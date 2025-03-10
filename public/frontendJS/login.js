document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
    const toggleButton = document.getElementById("field-icon");
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault(); // Prevent default form submission

            const email = emailInput.value;
            const password = passwordInput.value;

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
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    window.location.href = "dashboard.html"; // Redirect on successful login
                } else {
                    errorMessage.textContent = data.message || "Login failed. Please try again.";
                    errorMessage.style.display = "block";
                }
            } catch (error) {
                console.error("Error during login:", error);
                errorMessage.textContent = "An error occurred. Please try again later.";
                errorMessage.style.display = "block";
            }
        });
    }

    // Toggle password visibility
    
    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggleButton.innerHTML = '<i class="fa fa-eye"></i>';
            } else {
                passwordInput.type = "password";
                toggleButton.innerHTML = '<i class="fa fa-eye-slash"></i>';
            }
        });
    }


    // Search input handling
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("searchbtn").click();
            }
        });
    }
});
