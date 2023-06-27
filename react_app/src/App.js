import { Component } from 'react';
import './App.css';
import QuestionShowPage from './components/QuestionShowPage';
// import QuestionIndexPage from './components/QuestionIndexPage';
import { Session } from './request';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
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
      <QuestionShowPage/>
    )
  }
}

export default App;
