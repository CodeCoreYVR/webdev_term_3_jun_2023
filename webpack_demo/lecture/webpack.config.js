const path = require("path") // you must specify this for the output

// Entry Points
// https://webpack.js.org/concepts/#entry

// Output
// https://webpack.js.org/concepts/#output
module.exports = {
    mode: "development", // here we we specify which environment mode to use - development or production
    // We can specify a path to an entry file in mulitple ways:
    // single entry -> entry: "./src/index.js"
    // array entry -> entry: ["./src/index.js", "./src/a.js", "./src/b.js"]
    // As an object with specified outputs of bundles(creating multiple bundles from separate entry files):
    entry: {
            chunkA : "./src/a.js" ,
            chunkB :"./src/b.js", 
            main: "./src/index.js"
        },
    output: {
        // Output requires the use of "path" to specify the location where our bundle files are created
        path: path.join(__dirname, "build")
    }
}