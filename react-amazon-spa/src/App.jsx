import React, { Component } from 'react';
// import { Session } from './api/v1/sessionsApi';
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
    this.state = { user: null };
  }

  // componentDidMount() {
  //   Session.create({
  //     email: "admin@user.ca",
  //     password: "password",
  //   }).then(fetchedUser => {
  //     this.setState({ user: fetchedUser });
  //   })
  // }


  render() {
    return (
      <div className="grid-container">
            <Router>
              <NavBar />
              <div className="container mt-2">
                <div className="content-container">
                  <Switch>
                    <Route path="/products/new" component={ NewProductPage } />
                    <Route path="/products/:id/edit" component={ UpdateProductPage } />
                    <Route path="/products/:id" component={ ProductShowPage } />
                    <Route exact path="/products" component={ ProductIndexPage } />
                    <Route exact path="/session/new" component={ SignInPage } />
                  </Switch>
                </div>
              </div>
            </Router>
      </div>
    );
  }
}
