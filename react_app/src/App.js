import { Component } from 'react';
import './App.css';
import QuestionShowPage from './components/QuestionShowPage';
import QuestionIndexPage from './components/QuestionIndexPage';
import WelcomePage from './components/WelcomePage';
import { Session } from './request';
import { Route, Routes } from 'react-router-dom';


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
      <Routes>
        <Route path='/' element={<WelcomePage/>}/>
        <Route path='/questions' element={<QuestionIndexPage/>}/>
        <Route path='/questions/:id' element={<QuestionShowPage/>}/>
      </Routes>
    )
  }
}

export default App;
