import { useState, useEffect } from 'react';
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
import UseStateHook from './components/UseStateHook';
import UseEffectHook from './components/UseEffectHook';
import { NotFoundPage } from './components/NotFoundPage';

export default function App(){
  const [user, setUser] = useState(null) 


  const getCurrentUser = () => {
    User.current()
      .then(user => {
        if (user?.id) {
          setUser(user)
        }
      })
      .catch(err => {
        //Show login error in the ui
        console.log(err)
      })
  }

  const signOut = () => {
    setUser(null)
  }

  useEffect(() => {
    getCurrentUser()
  }, [])

  return (
    <>
      <NavBar currentUser={user} onSignOut={signOut} />
      <div className="container mt-4">
        <Routes>
          {!user && <Route exact path='/sign-in' element={<SignInPage onSignIn={getCurrentUser} />} />}
          {!user && <Route exact path='/sign-up' element={<SignUpPage onSignUp={getCurrentUser}/>} />}
          <Route exact path='/' element={<WelcomePage />} />
          <Route exact path='/questions' element={<QuestionIndexPage />} />
          <Route exact path='/questions/new'element={<AuthRoute
              page={<NewQuestionPage />}
              isLoggedIn={!!user} />} />
          <Route path='/questions/:id' element={<QuestionShowPage />} />
          <Route path='/use_state' element={<UseStateHook/>} />
          <Route path='/use_effect' element={<UseEffectHook/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>

    </>
  )
}

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       user: null
//     }
//   }

//   componentDidMount() {
//     // Session.create({
//     //   email: "tony@stark.com",
//     //   password: "123abc"
//     // })
//     // .then((fetchedUser) => {
//     //   this.setState((state) => {
//     //     return{
//     //       user: fetchedUser
//     //     }
//     //   })
//     // })
//     this.getCurrentUser();
//   }

//   getCurrentUser = () => {
//     User.current()
//       .then(res => {
//         if (res?.id) {
//           this.setState({
//             user: res
//           })
//         }
//       })
//       .catch(err => {
//         //Show login error in the ui
//         console.log(err)
//       })
//   }

//   signOut = () => {
//     this.setState({
//       user: null
//     })
//   }

//   render() {
//     return (
//       <>
//         <NavBar currentUser={this.state.user} onSignOut={this.signOut} />
//         <div className="container mt-4">
//           <Routes>
//             {!this.state.user && <Route exact path='/sign-in' element={<SignInPage onSignIn={this.getCurrentUser} />} />}
//             {!this.state.user && <Route exact path='/sign-up' element={<SignUpPage onSignUp={this.getCurrentUser}/>} />}
//             <Route exact path='/' element={<WelcomePage />} />
//             <Route exact path='/' element={<WelcomePage />} />
//             <Route exact path='/questions' element={<QuestionIndexPage />} />
//             <Route exact path='/questions/new'element={<AuthRoute
//                 page={<NewQuestionPage />}
//                 isLoggedIn={!!this.state.user} />} />
//             <Route path='/questions/:id' element={<QuestionShowPage />} />
//             <Route path='/use_state' element={<UseStateHook/>} />
//             <Route path='/use_effect' element={<UseEffectHook/>} />
//           </Routes>
//         </div>

//       </>
//     )
//   }
// }

// export default App;
