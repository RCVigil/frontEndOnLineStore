import React, { Component } from 'react';
import Category from '../components/Category';

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
      <div className="search">
        <input
          className="inputSearch"
          type="text"
          placeholder="Busca"
          onChange={ this.handleChange }
        />
        <section className="results">
          <Category />

          {inputSearch === '' ? (
            <h4
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h4>) : ''}
        </section>

      </div>
    );
  }
}

export default search;
