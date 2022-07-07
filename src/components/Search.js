import React, { Component } from 'react';

class search extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
  }

  render() {
    const { search } = this.state;
    return (
      <div>
        <input
          type="text"
          onChange={ this.handleChange }
        />

        { search === '' ? <h4
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4> : ''}
      </div>
    );
  }
}

export default search;
