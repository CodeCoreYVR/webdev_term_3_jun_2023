import React, { useState, useEffect } from 'react';
import { User } from './api/v1/usersApi';
import 'bootstrap/dist/css/bootstrap.css';
import "./css/App.css";
import ProductIndexPage from './components/ProductIndexPage';
import ProductShowPage from './components/ProductShowPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProductNewPage from './components/ProductNewPage';
import ProductUpdatePage from './components/ProductUpdatePage';
import SignInPage from './components/SignInPage';
import AuthRoute from './components/AuthRoute';


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCurrentUser = () => {
    return User.current().then(user => {
      if (user?.id) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    })
    .catch(error => {
      if (error.status === 401) {
        setCurrentUser(null);
      } else {
        console.error(error);
      }  
    })
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const onSignOut = () => {
    setCurrentUser(null);
  };


  return (
    <div className="grid-container">
      { loading ? (
        <div>Loading...</div>
      ) : (
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
                  component={ ProductNewPage } 
                />
                
                <AuthRoute
                  isAuth={ currentUser }
                  path="/products/:id/edit" 
                  component={ ProductUpdatePage } 
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
      )}
    </div>
  );
}

export default App;