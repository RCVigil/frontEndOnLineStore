import React, { Component } from 'react';
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
      <div data-testid="product" key={ index }>
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
      <div>
        <input
          type="text"
          data-testid="query-input"
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

        {inputSearch === '' ? (
          <h4
            data-testid="home-initial-message"
          >
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>) : (this.renderProductList())}
      </div>
    );
  }
}

export default Search;
