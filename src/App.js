import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './components/Search';
import Carrinho from './pages/Carrinho';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={ Search } />
          <Route exact path="/carrinho" component={ Carrinho } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
