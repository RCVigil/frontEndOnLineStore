import React, { Component } from 'react';
import ListCart from '../components/ListCart';

class Carrinho extends Component {
  state = {
    carrinho: [],
  }

  componentDidMount() {
    const local = JSON.parse(localStorage.getItem('productCart'));
    this.setState({ carrinho: local });
  }

  removItemId = (idItem) => {
    const local = JSON.parse(localStorage.getItem('productCart'));
    const filter = local.filter(({ id }) => id !== idItem);
    localStorage.setItem('productCart', JSON.stringify(filter));
    this.setState({ carrinho: filter });
  }

  render() {
    const { carrinho } = this.state;
    return (
      <div>
        { carrinho
          ? (
            <>
              <p>
                {carrinho.length}
              </p>
              {carrinho.map((item) => (
                <ListCart
                  key={ item.id }
                  item={ item }
                  removItemId={ this.removItemId }
                />))}
            </>
          )
          : (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          ) }
      </div>
    );
  }
}
export default Carrinho;
