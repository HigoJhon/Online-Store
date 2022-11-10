import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class pageCard extends React.Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const url = `https://api.mercadolibre.com/items/${id}`;
    const data = await fetch(url);
    const dataJson = await data.json();
    this.setState({ product: dataJson });
  }

  render() {
    const { product: { title, price, thumbnail } } = this.state;
    return (
      <div className="pageCard">
        <h1 data-testid="product-detail-name">{ title }</h1>
        <h1 data-testid="product-detail-price">{ price }</h1>
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <Link to="/ShoppingCart" data-testid="shopping-cart-button">
          Carrinho de compra.
        </Link>
      </div>
    );
  }
}

pageCard.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default pageCard;
