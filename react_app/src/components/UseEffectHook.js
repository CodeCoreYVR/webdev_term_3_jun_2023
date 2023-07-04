import { useEffect, useState } from "react";

export default function UseEffectHook() {
    const [date, setDate] = useState(new Date())
    const [count, setCount] = useState(0)

    // 1 Component did mount
    // 2 Component did update
    // 3 Component will unmount

    // if you pass an empty array as the second arguement of useEffect hook
    // then it's the same as 'componentdidmount'
    // useEffect(() => {
    //     console.log("Component did mount")
    // }, [])

    // if we pass a value in that array, the useEffect hook becomes the 'componentdidupdate'
    // useEffect(() => {
    //     console.log("Component did updated")
    // }, [count])

    // the return acts as 'componentwillunmount'
    // useEffect(() => {
    //    return () => {
    //     console.log('Component will unmount')
    //    } 
    // }, [])

    useEffect(() => {
        console.log('you are inside userEffect function')
        return () => {
            console.log('component willumount')
        }
    }, [])


    return(
        <div>
            {date.toLocaleString()}
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