import "./a.js"

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