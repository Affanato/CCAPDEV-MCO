const seats = document.querySelectorAll("#seat-form input[type='button']")

for(let seat of seats) {
    seat.addEventListener("click", () => {
        const selected = document.querySelectorAll("#seat-form .selected")
        for(let prevSeat of selected){
            prevSeat.classList.remove("selected")
        }   

        seat.classList.add("selected")
    })
}