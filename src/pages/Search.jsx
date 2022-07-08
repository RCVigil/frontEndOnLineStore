import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Category from '../components/Category';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      list: [],
      search: false,
      id: '',
      btn: true,
      displayList: true,
      loading: false,
    };
  }

  // componentDidMount() {
  //   this.getApi();
  // }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      inputSearch: value,
      btn: !value.length > 0,
    });
  }

  getApi = async () => {
    const { inputSearch, id } = this.state;
    this.setState({ loading: true });
    const list = await getProductsFromCategoryAndQuery(id, inputSearch);
    this.setState({ list: list.results, search: true, loading: false });
  }

  onClickgetProducts = () => {
    this.getApi();
    this.setState({ search: true, displayList: false });
  }

  categoryId = (id) => {
    this.setState({ id }, () => {
      this.getApi();
      this.setState({ search: true, displayList: false });
    });
  }

  renderProductList = () => {
    const { list, search, loading } = this.state;
    const renderedList = list.map((product, index) => (
      <div className="listProducts" data-testid="product" key={ index }>
        <h4>{product.title}</h4>
        <img src={ product.thumbnail } alt={ product.title } />
        <p>
          R$
          {product.price}
          ,00
        </p>
      </div>));
    const display = search && list.length === 0
      ? <h4> Nenhum produto foi encontrado </h4>
      : renderedList;
    return loading ? <Loading /> : display;
  }

  render() {
    const { inputSearch, btn, displayList } = this.state;
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
          disabled={ btn }
        >
          Buscar
        </button>

        <section className="results">
          <Category categoryId={ this.categoryId } />

          {displayList ? (
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
