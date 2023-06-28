import { Component } from 'react';
import './App.css';
import QuestionShowPage from './components/QuestionShowPage';
import QuestionIndexPage from './components/QuestionIndexPage';
import WelcomePage from './components/WelcomePage';
import NewQuestionPage from './components/NewQuestionPage';
import SignInPage from './components/SignInPage';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { User } from './request';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount() {
    // Session.create({
    //   email: "tony@stark.com",
    //   password: "123abc"
    // })
    // .then((fetchedUser) => {
    //   this.setState((state) => {
    //     return{
    //       user: fetchedUser
    //     }
    //   })
    // })
  }

  getCurrentUser = () => {
    User.current()
      .then(res => {
        if (res?.id) {
          this.setState({
            user: res
          })
        }
      })
      .catch(err => {
        //Show login error in the ui
        console.log(err)
      })
  }

  signOut = () => {
    this.setState({
      user: null
    })
  }

  render() {
    return (
      <>
        <NavBar currentUser={this.state.user} onSignOut={this.signOut}/>
        <Routes>
          <Route exact path='/sign-in' element={<SignInPage onSignIn={this.getCurrentUser} />} />
          <Route exact path='/' element={<WelcomePage />} />
          <Route exact path='/questions' element={<QuestionIndexPage />} />
          <Route exact path='/questions/new' element={<NewQuestionPage />} />
          <Route path='/questions/:id' element={<QuestionShowPage />} />
        </Routes>
      </>
    )
  }
}

export default App;
