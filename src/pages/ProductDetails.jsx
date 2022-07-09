import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Form from '../components/Form';
import '../css/App.css';
import ReviewList from '../components/ReviewList';

export default class ProductDetails extends Component {
  state = {
    productObj: {},
    productReview: [],
    loading: true,
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = async () => {
    const { match: { params: { productId } } } = this.props;
    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const data = await response.json();
    this.setState({ productObj: data, loading: false },
      () => this.getReviewListfromLocalStorage());
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

  submit = () => {
    // this.setState({ productReview: [obj] });
    this.getReviewListfromLocalStorage();
  }

  getReviewListfromLocalStorage = () => {
    const localInfo = JSON.parse(localStorage.getItem('reviewList'));
    const { productObj } = this.state;
    if (localInfo !== null) {
      const data = localInfo.filter(({ id }) => id === productObj.id);
      this.setState({ productReview: data });
    }
  }

  render() {
    const { loading, productObj, productReview } = this.state;
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
            <Form id={ productObj.id } submit={ this.submit } />
            { productReview.map((item, index) => (
              <ReviewList key={ index } obj={ item } />))}
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
