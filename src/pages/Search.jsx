import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      list: [],
      search: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputSearch: value,
    });
  }

  onClickgetProducts = async () => {
    const { inputSearch } = this.state;
    const list = await getProductsFromCategoryAndQuery('', inputSearch);
    this.setState({ list: list.results, search: true });
  }

  renderProductList = () => {
    const { list, search } = this.state;
    const renderedList = list.map((product, index) => (
      <div className="listProducts" data-testid="product" key={ index }>
        <h4>{product.title}</h4>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>
          R$
          { product.price }
          ,00
        </p>
      </div>));
    return search && list.length === 0
      ? <h4> Nenhum produto foi encontrado </h4>
      : renderedList;
  }

  render() {
    const { inputSearch } = this.state;
    return (
      <div className="search">
        <input
          className="inputSearch"
          type="text"
          data-testid="query-input"
          placeholder="Busca"
          onChange={ this.handleChange }
          value={ inputSearch }
        />

        <button
          data-testid="query-button"
          type="button"
          onClick={ this.onClickgetProducts }
        >
          Buscar
        </button>

        <section className="results">
          <Category />

          {inputSearch === '' ? (
            <h4
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h4>) : (this.renderProductList())}
        </section>
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

export default Search;
