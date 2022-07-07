import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Search } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
