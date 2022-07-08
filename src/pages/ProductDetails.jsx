import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';

export default class ProductDetails extends Component {
  state = {
    productObj: {},
    loading: true,
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = async () => {
    const { match: { params: { productId } } } = this.props;
    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const data = await response.json();
    this.setState({ productObj: data, loading: false });
  }

  addToCart = (obj) => {
    const local = JSON.parse(localStorage.getItem('productCart'));
    if (local === null) {
      const data = [obj];
      return localStorage.setItem('productCart', JSON.stringify(data));
    }
    const filter = local.filter(({ id }) => id !== obj.id);
    const arr = [...filter, obj];
    localStorage.setItem('productCart', JSON.stringify(arr));
  }

  render() {
    const { loading, productObj } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <div>
            <h4 data-testid="product-detail-name">
              {productObj.title}
            </h4>
            <p>
              R$
              {productObj.price}
              ,00
            </p>
            <img src={ productObj.thumbnail } alt={ productObj.title } />
            <button
              type="button"
              data-testid="product-detail-add-to-cart"
              onClick={ () => this.addToCart(productObj) }
            >
              Adicionar ao Carrinho

            </button>
            <Link
              to="/carrinho"
              data-testid="shopping-cart-button"
            >
              Ir para o carrinho
            </Link>
          </div>
        )}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string,
    }),
  }),
}.isRequired;
