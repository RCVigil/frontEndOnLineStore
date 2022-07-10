import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCategories } from '../services/api';

export default class Category extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.searchApi();
  }

  searchApi = async () => {
    const data = await getCategories();
    this.setState({ data });
  }

  inputRadio = ({ target }) => {
    const { categoryId } = this.props;
    const { value } = target;
    categoryId(value);
  }

  render() {
    const { data } = this.state;
    return (
      <div className="category">
        {data.map((item) => (
          <label
            data-testid="category"
            key={ item.id }
            htmlFor={ item.id }
            className="categoryRadio"
          >
            <input
              id={ item.id }
              type="radio"
              name="category"
              value={ item.id }
              onChange={ this.inputRadio }
            />
            {item.name}
          </label>
        ))}

      </div>
    );
  }
}

Category.propTypes = {
  categoryId: PropTypes.func.isRequired,
};
