import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { saveItem, getItem } from '../components/LocalStorage';
import Email from './Email';

class PageCard extends React.Component {
  state = {
    product: {},
    cartItems: [],
    cartLength: 0,
    shipping: false,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const url = `https://api.mercadolibre.com/items/${id}`;
    const data = await fetch(url);
    const dataJson = await data.json();
    const saveCartItems = getItem('cart');
    const validSaveCart = saveCartItems === null ? [] : saveCartItems;
    this.setState({
      product: dataJson,
      cartItems: validSaveCart,
      cartLength: validSaveCart.length,
      shipping: dataJson.shipping.free_shipping,
    });
  }

  onSaveCart = () => {
    const { product } = this.state;
    this.setState((prev) => ({
      cartItems: [...prev.cartItems, product],
    }), () => {
      const { cartItems } = this.state;
      saveItem('cart', cartItems);
      this.setState({ cartLength: cartItems.length });
    });
  };

  render() {
    const { product: { title, price, thumbnail },
      cartLength, shipping } = this.state;
    console.log(shipping);
    return (
      <div className="pageCard">
        <h1 data-testid="product-detail-name">{ title }</h1>
        <h1 data-testid="product-detail-price">{ price }</h1>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        {
          shipping && <p data-testid="free-shipping">Frete grátis</p>
        }
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.onSaveCart }
          name={ title }
        >
          Adicionar ao Carrinho
        </button>
        <Link to="/ShoppingCart" data-testid="shopping-cart-button">
          <p
            data-testid="shopping-cart-size"
          >
            { `Carrinho de compra. ${cartLength} itens` }
          </p>
        </Link>
        <Email { ...this.props } />
      </div>
    );
  }
}

PageCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default PageCard;
