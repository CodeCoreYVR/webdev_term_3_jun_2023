import "./a.js"
import nature from "./images/nature.jpg"

console.log("Hello World")

function add(a, b){
    return a + b
}

add(1, 2)

const arr = [1, 2, 3, 4]

add(arr[0], arr[1])

console.log("This is the index.js entry point")

console.log("Goodbye World")

console.log("This does not run atuomatically if I don't have the --watch running")

console.log("Added mode config to use development environment!")

document.addEventListener("DOMContentLoaded", () => {
    const img = document.createElement("img")
    img.src = nature
    document.querySelector("body").append(img)
})