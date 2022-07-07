import React, { Component } from 'react';

class Carrinho extends Component {
  state = {
    carrinho: [],
  }

  render() {
    const { carrinho } = this.state;
    return (
      <div>
        { carrinho.length === 0 && (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) }
      </div>
    );
  }
}
export default Carrinho;
