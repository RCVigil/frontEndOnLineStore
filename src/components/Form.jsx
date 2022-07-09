import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Form extends Component {
  state = {
    email: '',
    avaliação: '',
    nota: '',
  }

  handleChangeEmail = ({ target }) => {
    const { value } = target;
    this.setState({ email: value });
  }

  handleChangeEvaluation = ({ target }) => {
    const { value } = target;
    this.setState({ avaliação: value });
  }

  handleChangeChecked = ({ target }) => {
    const { checked, value } = target;
    if (checked) {
      this.setState({ nota: value });
    }
  }

  submitReview = () => {
    const { id, submit } = this.props;
    const { email, avaliação, nota } = this.state;
    const product = { id, email, avaliação, nota };

    const localInfo = JSON.parse(localStorage.getItem('reviewList'));
    if (localInfo === null) {
      const data = [product];
      localStorage.setItem('reviewList', JSON.stringify(data));
      submit(product);
      return this.setState({
        email: '',
        avaliação: '',
        nota: '',
      });
    }

    const filter = localInfo.filter((item) => (
      item.avaliação !== avaliação || item.id !== id));

    const arr = [...filter, product];
    localStorage.setItem('reviewList', JSON.stringify(arr));
    submit(product);
    this.setState({
      email: '',
      avaliação: '',
      nota: '',
    });
  };

  render() {
    const { email, avaliação } = this.state;
    return (
      <form className="form">
        <h3>Avalições</h3>
        <input
          data-testid="product-detail-email"
          type="email"
          value={ email }
          placeholder="E-mail"
          onChange={ this.handleChangeEmail }
        />
        <link
          rel="stylesheet"
          href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        />
        <div className="estrelas">
          Nota
          <label htmlFor="cm_star-1">
            <i className="fa" />
            <input
              data-testid="1-rating"
              type="radio"
              id="cm_star-empty"
              name="fb"
              value="1"
              onChange={ this.handleChangeChecked }
            />
          </label>
          <label htmlFor="cm_star-2">
            <input
              data-testid="2-rating"
              type="radio"
              id="cm_star-1"
              name="fb"
              value="2"
              onChange={ this.handleChangeChecked }
            />
            <i className="fa" />
          </label>
          <label htmlFor="cm_star-3">
            <i className="fa" />
            <input
              data-testid="3-rating"
              type="radio"
              id="cm_star-2"
              name="fb"
              value="3"
              onChange={ this.handleChangeChecked }
            />
          </label>
          <label htmlFor="cm_star-4">
            <i className="fa" />
            <input
              data-testid="4-rating"
              type="radio"
              id="cm_star-3"
              name="fb"
              value="4"
              onChange={ this.handleChangeChecked }
            />
          </label>
          <label htmlFor="cm_star-5">
            <i className="fa" />
            <input
              data-testid="5-rating"
              type="radio"
              id="cm_star-4"
              name="fb"
              value="5"
              onChange={ this.handleChangeChecked }
            />
          </label>
        </div>

        <textarea
          data-testid="product-detail-evaluation"
          placeholder="Avalição"
          value={ avaliação }
          onChange={ this.handleChangeEvaluation }
        />
        <button
          data-testid="submit-review-btn"
          type="button"
          onClick={ this.submitReview }
        >
          Enviar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
};
