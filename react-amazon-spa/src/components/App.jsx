// import logo from './logo.svg';
import React, { Component } from 'react';
import ProductShowPage from './ProductShowPage';
import "../css/App.css";
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
    <div className="grid-container">
      <div className="container mt-2">
        <div className="content-container">
          <ProductShowPage /> 
        </div>
      </div>
    </div>
    );
  }
}

export default App;
