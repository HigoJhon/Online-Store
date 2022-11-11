import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItem } from '../components/LocalStorage';

class Checkout extends Component {
  state = {
    cartItems: [],
    sum: {},
    fullName: '',
    userEmail: '',
    userCPF: '',
    userPhone: '',
    userCEP: '',
    userAddress: '',
    isButtonDisable: true,
    validText: false,
    redirectt: false,
    radio: false,
  };

  componentDidMount() {
    const cartList = getItem('cart');
    const itemSum = getItem('sum');
    this.setState({
      cartItems: cartList,
      sum: itemSum,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value, type } = target;
    const validValue = type === 'radio' ? target.checked : value;
    this.setState({
      [name]: validValue,
      validText: false,
    }, () => {
      const { fullName, userAddress, userEmail, userPhone,
        userCEP, userCPF, radio } = this.state;
      const validaton = fullName === ''
        || userAddress === ''
        || userPhone === ''
        || userCEP === ''
        || userEmail === ''
        || userCPF === ''
        || radio === false;

      this.setState({
        isButtonDisable: validaton,
      });
    });
  };

  onClick = (event) => {
    event.preventDefault();
    const { isButtonDisable } = this.state;
    this.setState({ validText: isButtonDisable });
    if (!isButtonDisable) {
      this.setState({
        redirectt: true,
      }, () => {
        localStorage.removeItem('cart');
        localStorage.removeItem('sum');
      });
    }
  };

  render() {
    const { cartItems, sum, fullName, userEmail, userCPF,
      userPhone, userCEP, userAddress, validText, redirectt } = this.state;
    return (
      <div>
        <ul>
          {
            cartItems.map((item) => (
              <li key={ item.id }>
                <p>{ item.title }</p>
                <p>{ item.price }</p>
                <p>{ sum[item.id] }</p>
              </li>
            ))
          }
        </ul>
        <form>
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Preencha seu nome"
            name="fullName"
            value={ fullName }
            onChange={ this.onInputChange }
          />
          <input
            data-testid="checkout-email"
            type="email"
            placeholder="Preencha seu emal"
            name="userEmail"
            value={ userEmail }
            onChange={ this.onInputChange }
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            placeholder="Preencha seu CPF"
            name="userCPF"
            value={ userCPF }
            onChange={ this.onInputChange }
          />
          <input
            data-testid="checkout-phone"
            type="text"
            placeholder="Preencha seu celular"
            name="userPhone"
            value={ userPhone }
            onChange={ this.onInputChange }
          />
          <input
            data-testid="checkout-cep"
            type="text"
            placeholder="Preencha seu CEP"
            name="userCEP"
            value={ userCEP }
            onChange={ this.onInputChange }
          />
          <input
            data-testid="checkout-address"
            type="text"
            placeholder="Preencha seu address"
            name="userAddress"
            value={ userAddress }
            onChange={ this.onInputChange }
          />
          <label htmlFor="boleto">
            Boleto
            <input
              data-testid="ticket-payment"
              type="radio"
              name="radio"
              value="1"
              id="boleto"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="visa">
            Visa
            <input
              data-testid="visa-payment"
              type="radio"
              name="radio"
              value="1"
              id="visa"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="master">
            Master
            <input
              data-testid="master-payment"
              type="radio"
              name="radio"
              value="1"
              id="master"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="elo">
            Elo
            <input
              data-testid="elo-payment"
              type="radio"
              name="radio"
              value="1"
              id="elo"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            data-testid="checkout-btn"
            type="submit"
            onClick={ this.onClick }
          >
            Pagamento
          </button>
        </form>
        {
          validText ? <h3 data-testid="error-msg">Campos inválidos</h3>
            : null
        }
        {
          redirectt ? <Redirect to="/" /> : ''
        }
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Checkout;
