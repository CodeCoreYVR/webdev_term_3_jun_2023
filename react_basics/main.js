// React.createElement - method for creating a React Element 
// A React element is an object that represents a DOM node

const ourFirstElement = React.createElement(
    'div',
    null, // this is the props used for 2 reasons: 1. setting attributes to an html elements, 2. its the properties for the react component
    'Hello World'
)

// Another Example
// const ourNewElementWithProps = React.createElement(
//     'a',
//     {href: 'https://google.ca'}, // props setting the attributes
//     'Google'
// )

// Because the main.js script will be loaded before the html body, we need to make
// sure that the document's content is loaded before we refer to it
//(i. e.: if you need to grab a div, this is the case) To do this, we wrap it into an event listener
// document.addEventListener('DOMContentLoaded', () => {
//     // ReactDOM library is used to interpret React elememts and render them to the DOM
//     // with the .render method
//     ReactDOM.render(
//         // first arguement is a React element - this is returned from the React.CreateElement
//         ourFirstElement,
//         // ourNewElementWithProps,
//         // second arguement is a DOM node we want to attach the element to 
//         // in this case we are going to grab the div we created with the id of 'app' 
//         document.getElementById("app"))
// })

const Name = (props) => {
    const {name, bgColor} =  props

    return React.createElement(
        'div',
        {
            // we are still writting JS here, but React can interpret it as CSS
            style: { backgroundColor: bgColor}
        },
        `${name}`
    )
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById("app")
    const root = ReactDOM.createRoot(container)
    root.render(
        //ourFirstElement
        Name({name: "Taif", bgColor: "pink"}) // now we can add an object to the funtion args as props
        // instead of rendering out the React element, we now render out a React Component.
    )
})