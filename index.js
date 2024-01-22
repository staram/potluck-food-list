import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-e100f-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const foodListInDB = ref(database, "foodList")

const inputFieldEl = document.getElementById("input-field")
const submitButtonEl = document.getElementById("submit-button")
const foodListEl = document.getElementById("shopping-list")

submitButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(foodListInDB, inputValue)
    
    clearInputFieldEl()

})


onValue(foodListInDB, function(snapshot) {
    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearfoodListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemTofoodListEl(currentItem)
        }    
    } else {
        foodListEl.innerHTML = "No items here... yet"
    }
    
    
})

function clearFoodListEl() {
    foodListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToFoodListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `foodList/${itemID}`)

        remove(exactLocationOfItemInDB)


    })

    foodListEl.append(newEl)
}