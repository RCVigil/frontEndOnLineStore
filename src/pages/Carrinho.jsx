import React, { Component } from 'react';
import ListCart from '../components/ListCart';
import FinalizePurchase from './FinalizePurchase';

class Carrinho extends Component {
  state = {
    carrinho: [],
    redirectFc: false,
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

  btnFinalizePurchase = () => {
    this.setState({ redirectFc: true });
  }

  render() {
    const { carrinho, redirectFc } = this.state;
    return (
      <div>
        {redirectFc ? <FinalizePurchase arr={ carrinho } /> : (
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
                  <button
                    type="button"
                    data-testid="checkout-products"
                    onClick={ this.btnFinalizePurchase }
                  >
                    Finalizar compra
                  </button>
                </>
              )
              : (
                <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
              ) }
          </div>
        )}

      </div>
    );
  }
}
export default Carrinho;
