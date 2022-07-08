import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Carrinho from './pages/Carrinho';
import ProductDetails from './pages/ProductDetails';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Link to="/">Search</Link>
          <Switch>
            <Route exact path="/" component={ Search } />
            <Route
              exact
              path="/carrinho"
              component={ Carrinho }
            />
            <Route
              path="/ProductDetails/:productId"
              render={ (props) => <ProductDetails { ...props } /> }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
