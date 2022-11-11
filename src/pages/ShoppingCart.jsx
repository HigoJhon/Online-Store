import React, { Component } from 'react';
import { getItem, saveItem } from '../components/LocalStorage';

class ShoppingCart extends Component {
  state = {
    cartItem: [],
    isCart: true,
    sum: {},
    isButtonMinDisabled: true,
  };

  componentDidMount() {
    const cartItems = getItem('cart');
    const validCart = cartItems === null;
    const isCart = cartItems.reduce((acc, curr) => {
      const { id } = curr;
      return { ...acc, [id]: 1 };
    }, {});
    this.setState({
      cartItem: cartItems,
      isCart: validCart,
      sum: isCart,
    });
  }

  onButtonPlus = ({ target }) => {
    const { value, name } = target;
    const { sum } = this.state;
    const validIncrement = sum[name] ? sum[name] : 1;
    const increase = validIncrement + +value;
    this.setState((prev) => ({
      sum: { ...prev.sum, [name]: increase },
      isButtonMinDisabled: false,
    }));
  };

  onButtonMin = ({ target }) => {
    const { value, name } = target;
    const { sum } = this.state;
    const increase = sum[name] - +value;
    this.setState((prev) => ({
      sum: { ...prev.sum, [name]: increase },
    }), () => {
      // const { sum } = this.state;
      const validTotal = sum[name] === 2;
      this.setState({ isButtonMinDisabled: validTotal });
    });
  };

  onButtonDelet = ({ target }) => {
    const { name } = target;
    const { cartItem } = this.state;
    const removedItems = cartItem.filter((item) => item.id !== name);
    this.setState({ cartItem: removedItems }, () => {
      saveItem('cart', removedItems);
    });
  };

  render() {
    const { cartItem, isCart, sum, isButtonMinDisabled } = this.state;
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
                        disabled={ isButtonMinDisabled }
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
              </ul>
            )
        }
      </div>
    );
  }
}

export default ShoppingCart;
