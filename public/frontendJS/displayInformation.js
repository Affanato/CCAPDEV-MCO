const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const d = new Date(), yearVal = d.getFullYear()

const roomDisplay = document.querySelector("#venue-display span")
const dateDisplay = document.querySelector("#date-display span")
const timeDisplay = document.querySelector("#time-display span")

const bookingForm = document.querySelector("#reservation-forms")

bookingForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const room = document.querySelector("#room")
    const month = document.querySelector("#month")
    const day = document.querySelector("#day")
    const time = document.querySelector("#time")

    roomDisplay.textContent = room.value
    dateDisplay.textContent = `${monthNames[month.value]} ${day.value}, ${yearVal}`
    timeDisplay.textContent = time.value
})
