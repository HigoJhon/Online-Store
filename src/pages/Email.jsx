import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { saveItem, getItem } from '../components/LocalStorage';

class Email extends Component {
  state = {
    isButtonDisable: true,
    email: '',
    rating: '',
    text: '',
    avaliations: [],
    btnCheck: false,
  };

  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const gotItem = getItem(id);
    const isItValid = gotItem === null ? [] : gotItem;
    this.setState(() => ({
      avaliations: isItValid,
      id,
    }));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      btnCheck: false,
    }, () => {
      this.inputValidation();
    });
  };

  inputValidation = () => {
    const { email, rating } = this.state;
    const validation = email.includes('@')
      && rating !== '';
    this.setState({ isButtonDisable: !validation });
  };

  buttonClick = (event) => {
    event.preventDefault();
    const { email, text, rating, isButtonDisable } = this.state;
    this.setState({ btnCheck: isButtonDisable });
    if (!isButtonDisable) {
      this.setState((prev) => ({
        avaliations: [...prev.avaliations,
          {
            email,
            text,
            rating,
          },
        ],
        email: '',
        rating: '',
        text: '',
        btnCheck: false,
        isButtonDisable: true,
      }), () => {
        const { avaliations } = this.state;
        const { id } = this.state;
        saveItem(id, avaliations);
      });
    }
  };

  render() {
    const { email, text, avaliations, btnCheck } = this.state;

    return (
      <>
        <form onSubmit={ this.buttonClick }>
          <label htmlFor="email">
            Email
            <input
              data-testid="product-detail-email"
              type="text"
              value={ email }
              placeholder="Digite o seu email"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          <label data-testid="1-rating" htmlFor="evaluator1">
            1
            <input
              type="radio"
              value="1"
              id="evaluator1"
              name="rating"
              onChange={ this.handleChange }
            />
          </label>
          <label data-testid="2-rating" htmlFor="evaluator2">
            2
            <input
              type="radio"
              value="2"
              id="evaluator2"
              name="rating"
              onChange={ this.handleChange }
            />
          </label>
          <label data-testid="3-rating" htmlFor="evaluator3">
            3
            <input
              type="radio"
              value="3"
              id="evaluator3"
              name="rating"
              onChange={ this.handleChange }
            />
          </label>
          <label data-testid="4-rating" htmlFor="evaluator4">
            4
            <input
              type="radio"
              value="4"
              id="evaluator4"
              name="rating"
              onChange={ this.handleChange }
            />
          </label>
          <label data-testid="5-rating" htmlFor="evaluator5">
            5
            <input
              type="radio"
              value="5"
              id="evaluator5"
              name="rating"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Digite o seu comentario"
            value={ text }
            onChange={ this.handleChange }
            name="text"
          />
          <br />
          <button
            data-testid="submit-review-btn"
            type="submit"
          >
            Avaliar
          </button>
        </form>
        {
          btnCheck && <p data-testid="error-msg">Campos inválidos</p>
        }
        {
          avaliations.map((eachAvaliation) => (
            <div key={ eachAvaliation.email }>
              <p data-testid="review-card-email">{ eachAvaliation.email }</p>
              <p data-testid="review-card-evaluation">{ eachAvaliation.text }</p>
              <p data-testid="review-card-rating">{ eachAvaliation.rating }</p>
            </div>
          ))
        }
      </>
    );
  }
}

Email.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Email;
