import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Carrinho from '../pages/Carrinho';

export default class ButtonCart extends Component {
  addCart = (obj) => <Carrinho productObj={ obj } />

  render() {
    const { productObj } = this.props;
    return (
      <button type="button" onClick={ () => this.addCart(productObj) }>AddCart</button>
    );
  }
}

ButtonCart.propTypes = {
  productObj: PropTypes.shape({
    title: PropTypes.string,
    thumbnail: PropTypes.string,
    price: PropTypes.string,
  }),
}.isRequired;
