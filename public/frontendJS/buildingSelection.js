const halls = document.querySelector("#building")
const rooms = document.querySelector("#room")

halls.value = "goks"

const roomDirectory = {
    goks: ["GK101A", "GK304A", "GK304B"],
    andrew: ["AG702", "AG1904"],
    st_la_salle: ["LS209", "LS311"]
}

//change displayed rooms based on current hall
halls.addEventListener("change", (e) => { 
    e.preventDefault()
    
    const currentHall = halls.value

    rooms.innerHTML = ""
    for(let currentRoom of roomDirectory[currentHall]){
        let roomElement = document.createElement("option")
        roomElement.setAttribute("name", currentRoom)
        roomElement.setAttribute("value", currentRoom)
        roomElement.innerText = currentRoom
        rooms.append(roomElement)
    }
})