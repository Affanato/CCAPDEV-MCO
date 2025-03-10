document.addEventListener("DOMContentLoaded", function () {
    const viewLabsButton = document.getElementById("view-labs-btn");

    if (viewLabsButton) {
        viewLabsButton.addEventListener("click", function () {
            // Check if the user is logged in via the global variable
            const isLoggedIn = Boolean(document.body.dataset.user);

            if (!isLoggedIn) {
                alert("Please Login First");
            } else {
                // Redirect to the reservation page if logged in
                window.location.href = "/reservation";
            }
        });
    }
});
