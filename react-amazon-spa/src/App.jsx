import React, { Component } from 'react';
// import { Session } from './api/v1/sessionsApi';
import { User } from './api/v1/usersApi';
import 'bootstrap/dist/css/bootstrap.css';
import "./css/App.css";
import ProductIndexPage from './components/ProductIndexPage';
import ProductShowPage from './components/ProductShowPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import NewProductPage from './components/NewProductPage';
import UpdateProductPage from './components/UpdateProductPage';
import SignInPage from './components/SignInPage';
import AuthRoute from './components/AuthRoute';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
  }

  // componentDidMount() {
  //   Session.create({
  //     email: "admin@user.ca",
  //     password: "password",
  //   }).then(fetchedUser => {
  //     this.setState({ user: fetchedUser });
  //   })
  // }

  getCurrentUser = () => {
    return User.current().then(user => {
      if (user?.id) {
        this.setState({ currentUser: user }, () => {
        });
      }
    });
  }

  onSignOut = () => {
    this.setState({ currentUser: null });
  };


  render() {
    const { currentUser } = this.state;
    return (
      <div className="grid-container">
            <Router>
              <NavBar currentUser={ currentUser } onSignOut={ this.onSignOut } />
              <div className="container mt-2">
                <div className="content-container">
                  <Switch>
                    {/* Session Routes */}
                    <Route 
                      exact 
                      path="/session/new" 
                      render={ (routeProps) => (
                        <SignInPage { ...routeProps } onSignIn={ this.getCurrentUser } />
                      )}
                    />


                    {/* Products Routes */}
                    <AuthRoute 
                      isAuth={ currentUser }
                      exact
                      path="/products/new" 
                      component={ NewProductPage } 
                    />
                    
                    <AuthRoute
                      isAuth={ currentUser }
                      path="/products/:id/edit" 
                      component={ UpdateProductPage } 
                    />
                    
                    <AuthRoute
                      isAuth={ currentUser }
                      path="/products/:id" 
                      component={ ProductShowPage } 
                    />
                    
                    <AuthRoute
                      isAuth={ currentUser }
                      exact 
                      path="/products" 
                      component={ ProductIndexPage }
                    />
                  </Switch>
                </div>
              </div>
            </Router>
      </div>
    );
  }
}
