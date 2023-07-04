import { useState } from "react";

export default function UseStateHook() {
    const [count, setCount] = useState(0)

    // this useState function returns an array
    // the first element of the array is the state
    // the second element is the function that will change the value of the state
    // this is similar to this.setState({count: 1})
    // this arguement inside useState is the default value of state

    return(
        <div>
            <button onClick={() => {
                setCount(count + 1)
            }}>
                Add 1
            </button>
            <br/>
            {count}
        </div>
    )
}