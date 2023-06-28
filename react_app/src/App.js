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
import AuthRoute from './components/AuthRoute';
import SignUpPage from './components/SignUpPage';


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
    this.getCurrentUser();
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
        <NavBar currentUser={this.state.user} onSignOut={this.signOut} />
        <div className="container mt-4">
          <Routes>
            <Route exact path='/sign-in' element={<SignInPage onSignIn={this.getCurrentUser} />} />
            <Route exact path='/sign-up' element={<SignUpPage/>} />
            <Route exact path='/' element={<WelcomePage />} />
            <Route exact path='/' element={<WelcomePage />} />
            <Route exact path='/questions' element={<QuestionIndexPage />} />
            <Route exact path='/questions/new'element={<AuthRoute
                page={<NewQuestionPage />}
                isLoggedIn={!!this.state.user} />} />
            <Route path='/questions/:id' element={<QuestionShowPage />} />
          </Routes>
        </div>

      </>
    )
  }
}

export default App;
