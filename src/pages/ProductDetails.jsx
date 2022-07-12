import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Form from '../components/Form';
import '../css/App.css';
import ReviewList from '../components/ReviewList';
import Purchased from '../components/Purchased';
import imgCart from '../images/shopping-cart.png';

export default class ProductDetails extends Component {
  state = {
    productObj: {},
    productReview: [],
    loading: true,
  }

  componentDidMount() {
    this.getApi();
    const { quantityProductCart } = this.props;
    const local = JSON.parse(localStorage.getItem('productCart'));
    if (local) {
      quantityProductCart(local.length);
    }
  }

  getApi = async () => {
    const { match: { params: { productId } } } = this.props;
    const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
    const data = await response.json();
    this.setState({ productObj: data, loading: false },
      () => this.getReviewListfromLocalStorage());
  }

  addToCart = (obj) => {
    const { quantityProductCart } = this.props;
    const local = JSON.parse(localStorage.getItem('productCart'));
    if (local === null) {
      const data = [obj];
      return localStorage.setItem('productCart', JSON.stringify(data));
    }
    const filter = local.filter(({ id }) => id !== obj.id);
    const arr = [...filter, obj];
    localStorage.setItem('productCart', JSON.stringify(arr));
    quantityProductCart(arr.length);
  }

  submit = () => {
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
    const { quantityCart } = this.props;
    return (
      <div>
        <p data-testid="shopping-cart-size">{quantityCart}</p>
        {loading ? <Loading /> : (
          <div>
            <Purchased />
            <h4 data-testid="product-detail-name">
              {productObj.title}
            </h4>
            { productObj.shipping.free_shipping
              ? <p data-testid="free-shipping"> Frete Grátis </p> : null }
            <p>
              R$
              {productObj.price}
            </p>
            <img
              className="center-product-image"
              src={ productObj.thumbnail }
              alt={ productObj.title }
            />
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
              <img src={ imgCart } alt="cart" width="40px" />
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
