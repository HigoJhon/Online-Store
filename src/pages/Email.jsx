import React, { Component } from 'react';
import { saveItem, getItem } from '../components/LocalStorage';

class Email extends Component {
  state = {
    isButtonDisable: true,
    email: '',
    ratingValue: '',
    areaText: '',
    avaliations: [],
  };

  componentDidMount() {
    const gotItem = getItem('eachAvaliation');
    const isItValid = gotItem === null ? [] : gotItem;
    console.log(isItValid);
    this.setState(() => ({
      avaliations: isItValid,
    }));
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.inputValidation();
    });
  };

  inputValidation = () => {
    const { email, ratingValue } = this.state;

    if (email.includes('@')
       && ratingValue) {
      this.setState({
        isButtonDisable: false,
      });
    }
  };

  buttonClick = (event) => {
    event.preventDefault();
    const { email, areaText, ratingValue } = this.state;
    this.setState((prev) => ({
      avaliations: [...prev.avaliations,
        {
          email,
          areaText,
          ratingValue,
        },
      ],
      email: '',
      ratingValue: '',
      areaText: '',
    }), () => {
      const { avaliations } = this.state;
      saveItem('eachAvaliation', avaliations);
    });
  };

  render() {
    const { email, areaText, isButtonDisable, avaliations } = this.state;
    return (
      <>
        <form onSubmit={ this.buttonClick }>
          <label htmlFor="email">
            Email
            <input
              data-testid="product-detail-email"
              type="email"
              value={ email }
              placeholder="Digite o seu email"
              name="email"
              onChange={ this.handleChange }
              required
            />
          </label>
          <label data-testid="1-rating" htmlFor="evaluator1">
            1
            <input
              data-testid="review-card-rating"
              type="radio"
              value="1"
              id="evaluator1"
              name="ratingValue"
              required
              onChange={ this.handleChange }
            />
          </label>
          <label data-testid="2-rating" htmlFor="evaluator2">
            2
            <input
              data-testid="review-card-rating"
              type="radio"
              value="2"
              id="evaluator2"
              name="ratingValue"
              required
              onChange={ this.handleChange }
            />
          </label>
          <label data-testid="3-rating" htmlFor="evaluator3">
            3
            <input
              data-testid="review-card-rating"
              type="radio"
              value="3"
              id="evaluator3"
              name="ratingValue"
              required
              onChange={ this.handleChange }
            />
          </label>
          <label data-testid="4-rating" htmlFor="evaluator4">
            4
            <input
              data-testid="review-card-rating"
              type="radio"
              value="4"
              id="evaluator4"
              name="ratingValue"
              required
              onChange={ this.handleChange }
            />
          </label>
          <label data-testid="5-rating" htmlFor="evaluator5">
            5
            <input
              data-testid="review-card-rating"
              type="radio"
              value="5"
              id="evaluator5"
              name="ratingValue"
              required
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Digite o seu comentario"
            value={ areaText }
            onChange={ this.handleChange }
            name="areaText"
          />
          <br />
          <button
            data-testid="submit-review-btn"
            type="submit"
            disabled={ isButtonDisable }
          >
            Avaliar
          </button>
        </form>
        {
          isButtonDisable && <p data-testid="error-msg">Campos inválidos</p>
        }
        {
          avaliations.map((eachAvaliation) => (
            <div key={ eachAvaliation.email }>
              <p data-testid="review-card-email">{ eachAvaliation.email }</p>
              <p data-testid="review-card-rating">{ eachAvaliation.ratingValue }</p>
              <p data-testid="review-card-evaluation">{ eachAvaliation.areaText}</p>
            </div>
          ))
        }
      </>
    );
  }
}
export default Email;
