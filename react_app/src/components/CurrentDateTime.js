import { Component } from "react";

class CurrentDateTime extends Component {
    constructor(props){
        super(props)
        this.state = {
            date: new Date()
        }
        console.log('1: Constructor Fired')
    }

    componentDidMount(){
        console.log('3: ComponentDidMount Fired')
        this.intervalId = setInterval(() => {
            this.setState((state) => {
                return (
                    { date : new Date()}
                )
            })
        }, 1000)
    }

    componentDidUpdate(){
        console.log('4: ComponentDidUpdate Fired')
    }

    componentWillUnmount(){
        console.log('5: ComponentWillUnmount Fired')
        clearInterval(this.intervalId)
    }

    render(){
        console.log('2: Render Fired')
        return(
            <div>
                {
                    this.props.shouldShowTime ?
                    this.state.date.toLocaleTimeString()
                    :
                    this.state.date.toLocaleDateString()
                }
            </div>
        )
    }
}

export default CurrentDateTime