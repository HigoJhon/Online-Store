import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getItem, saveItem } from '../components/LocalStorage';

class ShoppingCart extends Component {
  state = {
    cartItem: [],
    isCart: true,
    sum: {},
    isButtonMinDisabled: {},
    isButtonMaxDisabled: {},
  };

  componentDidMount() {
    const cartItems = getItem('cart');
    const sumItems = getItem('sum');
    const validCart = cartItems === null || cartItems.length === 0;
    if (!validCart) {
      const validSum = sumItems === null || sumItems.length === 0;
      const isSumValid = !validSum ? sumItems
        : cartItems.reduce((acc, curr) => {
          const { id } = curr;
          return { ...acc, [id]: 1 };
        }, {});
      console.log(isSumValid);
      const isButtonTrue = validCart ? cartItems
        : cartItems.reduce((acc, curr) => {
          const { id, available_quantity: quantity } = curr;
          const validPlus = quantity === isSumValid[curr.id];
          return { ...acc, [id]: validPlus };
        }, {});
      console.log(isButtonTrue);
      const isButtonFalse = cartItems === null ? null
        : cartItems.reduce((acc, curr) => {
          const { id, available_quantity: quantity } = curr;
          const validPlus = quantity === 1;
          return { ...acc, [id]: validPlus };
        }, {});
      console.log(isButtonFalse);
      this.setState({
        cartItem: cartItems,
        isCart: validCart,
        sum: isSumValid,
        isButtonMinDisabled: isButtonTrue,
        isButtonMaxDisabled: isButtonFalse,
      }, () => {
        const { sum } = this.state;
        saveItem('sum', sum);
      });
    }
  }

  onButtonPlus = ({ target }) => {
    const { value, name } = target;
    const { sum } = this.state;
    const validIncrement = sum[name] ? sum[name] : 1;
    const increase = validIncrement + +value;
    this.setState((prev) => ({
      sum: { ...prev.sum, [name]: increase },
      isButtonMinDisabled: { ...prev.isButtonMinDisabled, [name]: false },
    }), () => {
      const { sum: sumTest, cartItem } = this.state;
      saveItem('sum', sumTest);
      const filterCart = cartItem.filter((item) => item.id === name);
      const validPlus = sumTest[name] === filterCart[0].available_quantity;
      this.setState((prev) => ({
        isButtonMaxDisabled: { ...prev.isButtonMaxDisabled, [name]: validPlus },
      }));
    });
  };

  onButtonMin = ({ target }) => {
    const { value, name } = target;
    const { sum } = this.state;
    const increase = sum[name] - +value;
    this.setState((prev) => ({
      sum: { ...prev.sum, [name]: increase },
    }), () => {
      const { sum: sumTest } = this.state;
      saveItem('sum', sumTest);
      const validTotal = sumTest[name] === 1;
      this.setState((prev) => ({
        isButtonMinDisabled: { ...prev.isButtonMinDisabled, [name]: validTotal },
      }));
    });
  };

  onButtonDelet = ({ target }) => {
    const { name } = target;
    const { cartItem } = this.state;
    const removedItems = cartItem.filter((item) => item.id !== name);
    this.setState({ cartItem: removedItems }, () => {
      saveItem('cart', removedItems);
      const validCart = removedItems.length === 0;
      console.log(validCart);
      this.setState({ isCart: validCart });
    });
  };

  render() {
    const { cartItem, isCart, sum, isButtonMinDisabled,
      isButtonMaxDisabled } = this.state;
    return (
      <div>
        {
          isCart ? (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          )
            : (
              <ul>
                {
                  cartItem.map((item, index) => (
                    <li key={ `${item.id}${index}` }>
                      <p data-testid="shopping-cart-product-name">{ item.title }</p>
                      <p>{ item.price }</p>
                      <button
                        type="button"
                        data-testid="product-increase-quantity"
                        id="btnPlus"
                        name={ item.id }
                        value="1"
                        onClick={ this.onButtonPlus }
                        disabled={ isButtonMaxDisabled[item.id] }
                      >
                        +
                      </button>
                      <p data-testid="shopping-cart-product-quantity">{ sum[item.id] }</p>
                      <button
                        type="button"
                        data-testid="product-decrease-quantity"
                        id="btnMin"
                        name={ item.id }
                        value="1"
                        onClick={ this.onButtonMin }
                        disabled={ isButtonMinDisabled[item.id] }
                      >
                        -
                      </button>
                      <button
                        type="button"
                        data-testid="remove-product"
                        id="btnDel"
                        name={ item.id }
                        onClick={ this.onButtonDelet }
                      >
                        Remover
                      </button>
                    </li>
                  ))
                }
                <Link
                  to="/checkout"
                  data-testid="checkout-products"
                >
                  Checkout
                </Link>
              </ul>
            )
        }
      </div>
    );
  }
}

export default ShoppingCart;
