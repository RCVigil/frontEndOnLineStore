import React, { Component } from 'react';

class Carrinho extends Component {
  state = {
    carrinho: [],
  }

  componentDidMount() {
    const local = JSON.parse(localStorage.getItem('productCart'));
    this.setState({ carrinho: local });
  }

  renderItens = (array) => (
    <div>
      <p data-testid="shopping-cart-product-quantity">
        Você tem:
        {' '}
        {array.length}
        {' '}
        iten(s) no carrinho
      </p>
      {array.map((item, index) => (
        <div key={ index }>
          <p data-testid="shopping-cart-product-name">{item.title}</p>
          <img src={ item.thumbnail } alt={ item.title } width="100px" />
          <p>{item.price}</p>
        </div>
      ))}
    </div>)

  render() {
    const { carrinho } = this.state;
    return (
      <div>
        { carrinho ? this.renderItens(carrinho) : (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) }
      </div>
    );
  }
}
export default Carrinho;
