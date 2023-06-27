import { Component } from 'react';
import './App.css';
import CurrentDateTime from './components/CurrentDateTime';
// import QuestionShowPage from './components/QuestionShowPage';
// import QuestionIndexPage from './components/QuestionIndexPage';
import { Session } from './request';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      clocksCount: [1], // array for something
      user: null 
    }
  }

  componentDidMount(){
    Session.create({
      email: "tony@stark.com",
      password: "123abc"
    })
    .then((fetchedUser) => {
      this.setState((state) => {
        return{
          user: fetchedUser
        }
      })
    })
  }

  render(){
    return(
      <div>
        {
          this.state.clocksCount.map((c, i) => {
            return (<CurrentDateTime key={i} shouldShowTime={true}/>)
          })
        }
      </div>
    )
  }
}

export default App;
