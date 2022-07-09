import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ReviewList extends Component {
  render() {
    const { obj } = this.props;
    return (
      <div className="reviewList">
        <p>
          { obj.email }
        </p>
        <p>
          { obj.nota }
        </p>
        <p>
          { obj.avaliação }
        </p>
      </div>
    );
  }
}

ReviewList.propTypes = {
  obj: PropTypes.shape({
    email: PropTypes.string,
    nota: PropTypes.string,
    avaliação: PropTypes.string,
  }).isRequired,
};
