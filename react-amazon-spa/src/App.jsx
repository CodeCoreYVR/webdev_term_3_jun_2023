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
      console.log("currentUser before setState: ", this.state.currentUser)
      if (user) {
        this.setState({ currentUser: user }, () => {
          console.log("currentUser after setState: ", this.state.currentUser);
        });
      }
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="grid-container">
            <Router>
              <NavBar currentUser={ currentUser } />
              <div className="container mt-2">
                <div className="content-container">
                  <Switch>
                    <Route 
                      exact
                      path="/products/new" 
                      component={ NewProductPage } 
                    />
                    
                    <Route 
                      path="/products/:id/edit" 
                      component={ UpdateProductPage } 
                    />
                    
                    <Route 
                      path="/products/:id" 
                      component={ ProductShowPage } 
                    />
                    
                    <Route 
                      exact 
                      path="/products" 
                      component={ ProductIndexPage }
                    />

                    <Route 
                      exact 
                      path="/session/new" 
                      render={ (routeProps) => (
                        <SignInPage { ...routeProps } onSignIn={ this.getCurrentUser } />
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </Router>
      </div>
    );
  }
}
