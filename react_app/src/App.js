import { Component } from 'react';
import './App.css';
import QuestionShowPage from './components/QuestionShowPage';
import QuestionIndexPage from './components/QuestionIndexPage';
import WelcomePage from './components/WelcomePage';
import NewQuestionPage from './components/NewQuestionPage';
import NavBar from './components/NavBar';
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
      <>
        <NavBar/>
        <Routes>
          <Route exact path='/' element={<WelcomePage/>}/>
          <Route exact path='/questions' element={<QuestionIndexPage/>}/>
          <Route exact path='/questions/new' element={<NewQuestionPage/>}/>
          <Route path='/questions/:id' element={<QuestionShowPage/>}/>
        </Routes>
      </>
    )
  }
}

export default App;
