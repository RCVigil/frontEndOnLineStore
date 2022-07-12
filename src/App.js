import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Carrinho from './pages/Carrinho';
import ProductDetails from './pages/ProductDetails';

class App extends Component {
  state = {
    quantity: 0,
  }

  quantityProductCart = (num) => {
    this.setState({ quantity: num });
  }

  render() {
    const { quantity } = this.state;
    return (
      <div>
        <BrowserRouter>
          <Link to="/">Search</Link>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (<Search
                quantityCart={ quantity }
                quantityProductCart={ this.quantityProductCart }
              />) }
            />
            <Route
              exact
              path="/carrinho"
              render={ () => (<Carrinho
                quantityProductCart={ this.quantityProductCart }
              />) }

            />
            <Route
              path="/ProductDetails/:productId"
              render={ (props) => (<ProductDetails
                { ...props }
                quantityCart={ quantity }
                quantityProductCart={ this.quantityProductCart }
              />) }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
