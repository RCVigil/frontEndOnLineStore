import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Search from './components/Search';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route path="/" component={ Search } />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
