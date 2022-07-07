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
    console.log(data);
    this.setState({ data });
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
          >
            <input
              id={ item.id }
              type="radio"
              name="category"
            />
            {item.name}
          </label>
        ))}

      </div>
    );
  }
}
