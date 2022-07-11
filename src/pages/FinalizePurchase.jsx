import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class FinalizePurchase extends Component {
  state = {
    name: '',
    cpf: '',
    email: '',
    telephone: '',
    cep: '',
    address: '',
    number: '',
    city: '',
    state: '',
    price: 0,
    purchase: false,
  }

  componentDidMount() {
    this.price();
  }

  price = () => {
    const { arr } = this.props;
    const price = arr.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    this.setState({ price });
  }

  saveInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  purchase = () => {
    this.setState({ purchase: true });
  }

  render() {
    const { name, cpf, email, telephone, cep,
      address, number, city, state, price, purchase } = this.state;
    return (
      <div>
        {purchase ? <h1> Compra Finalizada!!!</h1> : (
          <>
            <h1>
              Valor total R$
              {price}
            </h1>
            <form>
              <input
                placeholder="name"
                type="text"
                name="name"
                value={ name }
                onChange={ this.saveInput }
                data-testid="checkout-fullname"
              />
              <input
                placeholder="cpf"
                name="cpf"
                value={ cpf }
                onChange={ this.saveInput }
                data-testid="checkout-cpf"
              />
              <input
                placeholder="email"
                type="email"
                name="email"
                value={ email }
                onChange={ this.saveInput }
                data-testid="checkout-email"
              />
              <input
                placeholder="telephone"
                name="telephone"
                value={ telephone }
                onChange={ this.saveInput }
                data-testid="checkout-phone"
              />
              <input
                placeholder="cep"
                name="cep"
                value={ cep }
                onChange={ this.saveInput }
                data-testid="checkout-cep"
              />
              <input
                placeholder="address"
                type="text"
                name="address"
                value={ address }
                onChange={ this.saveInput }
                data-testid="checkout-address"
              />
              <input
                placeholder="number"
                name="number"
                value={ number }
                onChange={ this.saveInput }
              />
              <input
                placeholder="city"
                type="text"
                name="city"
                value={ city }
                onChange={ this.saveInput }
              />
              <input
                placeholder="state"
                type="text"
                name="state"
                value={ state }
                onChange={ this.saveInput }
              />
              <button
                type="button"
                onClick={ this.purchase }
              >
                Comprar
              </button>
            </form>

          </>
        )}

      </div>
    );
  }
}

FinalizePurchase.propTypes = {
  arr: PropTypes.arrayOf().isRequired,
};
