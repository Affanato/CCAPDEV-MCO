const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const currentMonth = document.querySelector("#currentMonth")

let date = new Date(), 
curMonth = date.getMonth()

const monthSelection = document.querySelector("#month")
monthSelection.value = curMonth
const generateMonthOptions = () => {
    for(let i = curMonth; i < 12; i++){
        const newMonth = document.createElement("option")
        newMonth.innerText = months[i]
        newMonth.value = i
        newMonth.setAttribute("class", "selectDate")
        monthSelection.append(newMonth)
    }
}

const daySelection = document.querySelector("#day")
const generateDayOptions = (selectedMonth) => {
    for(let i = 1; i <= daysPerMonth[selectedMonth]; i++){
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