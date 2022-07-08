import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ListCart extends Component {
  state = {
    quantityProduct: 1,
  }

  increaseQuantity = (max) => {
    const { quantityProduct } = this.state;
    if (quantityProduct < max) {
      this.setState((set) => ({ quantityProduct: set.quantityProduct + 1 }));
    }
  }

  descreaseQuantity = () => {
    const { quantityProduct } = this.state;
    if (quantityProduct > 1) {
      this.setState((set) => ({ quantityProduct: set.quantityProduct - 1 }));
    }
  }

  removItem = (id) => {
    const { removItemId } = this.props;
    removItemId(id);
  }

  render() {
    const { item } = this.props;
    const { quantityProduct } = this.state;
    return (
      <div>
        <div key={ item.id }>
          <p data-testid="shopping-cart-product-name">{item.title}</p>
          <img src={ item.thumbnail } alt={ item.title } width="100px" />
          <p>
            R$
            {item.price}

          </p>
          <div>
            <button
              type="button"
              data-testid="product-decrease-quantity"
              onClick={ this.descreaseQuantity }
            >
              -
            </button>

            <p
              data-testid="shopping-cart-product-quantity"
            >
              {quantityProduct}
            </p>

            <button
              type="button"
              data-testid="product-increase-quantity"
              onClick={ () => this.increaseQuantity(item.available_quantity) }
            >
              +
            </button>
            <button
              type="button"
              onClick={ () => this.removItem(item.id) }
            >
              Remover

            </button>
          </div>
        </div>
      </div>
    );
  }
}

ListCart.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    price: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }),
}.isRequired;
