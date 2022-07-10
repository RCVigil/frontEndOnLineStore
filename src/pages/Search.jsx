import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Category from '../components/Category';
import { getProductsFromCategoryAndQuery } from '../services/api';
import Loading from '../components/Loading';
import imgCart from '../images/shopping-cart.png';
import imgSearch from '../images/search.png';

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
      idProduct: '',
      redirect: false,
    };
  }

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

  ProductDetails = (obj) => {
    this.setState({ idProduct: obj.id, redirect: true });
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

  renderProductList = () => {
    const { list, search, loading } = this.state;
    const renderedList = list.map((product, index) => (
      <div
        className="listProducts"
        data-testid="product"
        key={ index }

      >
        <h4>{product.title}</h4>
        <img
          src={ product.thumbnail }
          alt={ product.title }
          width="100px"

        />
        <p>
          R$
          {product.price}
        </p>
        <button
          type="button"
          data-testid="product-detail-link"
          onClick={ () => this.ProductDetails(product) }
        >
          Detalhes

        </button>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => this.addToCart(product) }
        >
          Adicionar ao carrinho
        </button>
      </div>));
    const display = search && list.length === 0
      ? <h4> Nenhum produto foi encontrado </h4>
      : renderedList;
    return loading ? <Loading /> : display;
  }

  render() {
    const { inputSearch, btn, displayList, idProduct, redirect } = this.state;
    return (
      <div>
        {redirect ? <Redirect
          to={ `/ProductDetails/${idProduct}` }
        /> : (
          <div className="home">
            <header className="header">
              <Link
                to="/carrinho"
                data-testid="shopping-cart-button"
                className="cartButton"
              >
                <img src={ imgCart } alt="cart" width="40px" />
              </Link>
              <input
                className="inputSearch"
                type="text"
                data-testid="query-input"
                placeholder="Busca"
                onChange={ this.handleChange }
                value={ inputSearch }
              />
              <input
                data-testid="query-button"
                src={ imgSearch }
                alt="Buscar"
                type="image"
                onClick={ this.onClickgetProducts }
                disabled={ btn }
                className="btnSearch"
              />

            </header>

            <div className="search">
              <Category categoryId={ this.categoryId } />
              <section className="results">

                {displayList ? (
                  <h4
                    data-testid="home-initial-message"
                  >
                    Digite algum termo de pesquisa ou escolha uma categoria.
                  </h4>) : (this.renderProductList())}
              </section>
            </div>

          </div>
        )}

      </div>
    );
  }
}

export default Search;
