import React, { Component } from 'react';
import { getItem } from '../components/LocalStorage';

class ShoppingCart extends Component {
  state = {
    cartItem: [],
    isCart: true,
  };

  componentDidMount() {
    const cartItems = getItem();
    const validCart = cartItems === null;
    this.setState({
      cartItem: cartItems,
      isCart: validCart,
    });
  }

  render() {
    const { cartItem, isCart } = this.state;
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
                      <p data-testid="shopping-cart-product-quantity">quantidade: 1</p>
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
