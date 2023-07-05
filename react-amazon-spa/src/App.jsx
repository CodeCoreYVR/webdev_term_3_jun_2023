// import logo from './logo.svg';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./css/App.css";
import ProductIndexPage from './components/ProductIndexPage';
import ProductShowPage from './components/ProductShowPage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  render() {
    return (
      <div className="grid-container">
            <Router>
              <NavBar />
              <div className="container mt-2">
                <div className="content-container">
                  <Routes>
                    <Route path="/products" element={ <ProductIndexPage /> } />
                    <Route path="/products/:id" element={ <ProductShowPage /> } />
                  </Routes>
                </div>
              </div>
            </Router>
      </div>
    );
  }
}

// export default App;
