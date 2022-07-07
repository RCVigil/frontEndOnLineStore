import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputSearch: value,
    });
  }

  render() {
    const { inputSearch } = this.state;
    return (
      <div>
        <input
          type="text"
          onChange={ this.handleChange }
        />

        {inputSearch === '' ? (
          <h4
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>) : ''}

        <Link
          to="/carrinho"
          data-testid="shopping-cart-button"
        >
          Ir para o carrinho
        </Link>

      </div>
    );
  }
}

export default search;
