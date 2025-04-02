const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const currentMonth = document.querySelector("#currentMonth")

let date = new Date(), 
curMonth = date.getMonth() + 1; // Convert to 1-based month

const monthSelection = document.querySelector("#month")
monthSelection.value = curMonth

const generateMonthOptions = () => {
    // Start from current month, use 1-based months (1-12)
    for(let i = curMonth; i <= 12; i++){
        const newMonth = document.createElement("option")
        newMonth.innerText = months[i - 1] // Adjust index for months array
        newMonth.value = i // Use 1-based month numbers
        newMonth.setAttribute("class", "selectDate")
        monthSelection.append(newMonth)
    }
}

const daySelection = document.querySelector("#day")
const generateDayOptions = (selectedMonth) => {
    // Adjust month index for daysPerMonth array
    const monthIndex = parseInt(selectedMonth) - 1;
    for(let i = 1; i <= daysPerMonth[monthIndex]; i++){
        const newDay = document.createElement("option")
        newDay.innerText = i
        newDay.value = i
        newDay.setAttribute("class", "selectDate")
        daySelection.append(newDay)
    }
}

monthSelection.addEventListener("change", () => {
    const currentMonth = monthSelection.value 
    daySelection.innerHTML = ""
    generateDayOptions(currentMonth)
})

generateMonthOptions()
generateDayOptions(curMonth)
