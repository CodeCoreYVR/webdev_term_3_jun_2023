import React, { useState, useEffect } from 'react';
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


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUser = () => {
    return User.current().then(user => {
      if (user?.id) {
        setCurrentUser(user);
      }
    });
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const onSignOut = () => {
    setCurrentUser(null);
  };


  return (
    <div className="grid-container">
          <Router>
            <NavBar currentUser={ currentUser } onSignOut={ onSignOut } />
            <div className="container mt-2">
              <div className="content-container">
                <Switch>
                  {/* Session Routes */}
                  <Route 
                    exact 
                    path="/session/new" 
                    render={ (routeProps) => (
                      <SignInPage { ...routeProps } onSignIn={ getCurrentUser } />
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

export default App;