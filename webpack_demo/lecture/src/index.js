import "./a.js"
import nature from "./images/nature.jpg"
import "./styles/main.css"
import React from "react"
import ReactDOM  from "react-dom"

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

// Create a react funtional component

const App = () => {
    return(
        <div>
            <h1>Here is the react element</h1>
            <img src={nature}></img>
        </div>
    )
}

document.addEventListener("DOMContentLoaded", () => {
    const img = document.createElement("img")
    img.src = nature
    document.querySelector("body").append(img)

    const rootDiv = document.createElement("div")
    document.querySelector("body").append(rootDiv)
    ReactDOM.render(<App/>, rootDiv)
})