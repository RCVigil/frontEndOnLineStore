import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ListCart from '../components/ListCart';
import FinalizePurchase from './FinalizePurchase';

class Carrinho extends Component {
  state = {
    carrinho: [],
    redirectFc: false,
    quantity: 0,
  }

  componentDidMount() {
    const { quantityProductCart } = this.props;
    const local = JSON.parse(localStorage.getItem('productCart'));
    this.setState({ carrinho: local }, () => {
      if (local) {
        quantityProductCart(local.length);
      }
    });
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

  quantityProduct = (boll) => {
    const { quantityProductCart } = this.props;
    const { quantity, carrinho } = this.state;
    if (boll) {
      this.setState((set) => ({ quantity: set.quantity + 1 }), () => {
        quantityProductCart(quantity + carrinho.length);
      });
    }
    if (!boll) {
      this.setState((set) => ({ quantity: set.quantity - 1 }), () => {
        quantityProductCart(quantity + carrinho.length);
      });
    }
  }

  render() {
    const { carrinho, redirectFc, quantity } = this.state;
    return (
      <div>
        {redirectFc ? <FinalizePurchase arr={ carrinho } /> : (
          <div>
            { carrinho
              ? (
                <>
                  <p>
                    {carrinho.length + quantity}
                  </p>
                  {carrinho.map((item) => (
                    <ListCart
                      key={ item.id }
                      item={ item }
                      removItemId={ this.removItemId }
                      quantityProduct={ this.quantityProduct }
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

Carrinho.propTypes = {
  quantityProductCart: PropTypes.func.isRequired,
};
export default Carrinho;
