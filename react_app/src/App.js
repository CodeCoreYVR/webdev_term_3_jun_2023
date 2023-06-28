import { Component } from 'react';
import './App.css';
import QuestionShowPage from './components/QuestionShowPage';
import QuestionIndexPage from './components/QuestionIndexPage';
import WelcomePage from './components/WelcomePage';
import NewQuestionPage from './components/NewQuestionPage';
import NavBar from './components/NavBar';
import { User } from './request';
import { Route, Routes } from 'react-router-dom';
import SignInPage from "./components/SignInPage";
import AuthRoute from './components/AuthRoute';


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

  signOut = () => {
    this.setState({
      user: null
    })
  }

  getCurrentUser = () => {
    return User.current().then((res) => {
      if (res?.id) {
        this.setState({
          user: res
        })
      }
    });
  };

  render() {
    const isLoggedIn = !!this.state.user
    return (
      <>
        <NavBar currentUser={this.state.user} onSignOut={ this.signOut } />
        <Routes>
          <Route exact path='/' element={<WelcomePage />} />
          <Route exact path='/sign_in' element={<SignInPage onSignIn={this.getCurrentUser} />} />
          <Route exact path='/questions' element={<QuestionIndexPage />} />
          <Route exact path='/questions/new' element={<AuthRoute isLoggedIn={isLoggedIn}  page={<NewQuestionPage/>} />} />
          <Route path='/questions/:id' element={<QuestionShowPage />} />
        </Routes>
      </>
    )
  }
}

export default App;
