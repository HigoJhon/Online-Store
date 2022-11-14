import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { saveItem, getItem } from '../components/LocalStorage';

class InitialPage extends Component {
  state = {
    categories: [],
    inputText: '',
    isButtonDisable: true,
    search: [],
    isUndefined: true,
    cartItems: [],
  };

  async componentDidMount() {
    const categoriesData = await getCategories();
    const saveCartItems = getItem('cart');
    const validSaveCart = saveCartItems === null ? [] : saveCartItems;
    this.setState({
      categories: categoriesData,
      cartItems: validSaveCart,
      cartLength: validSaveCart.length,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        isButtonDisable: false,
      });
    });
  };

  onButtonClick = async (event) => {
    event.preventDefault();
    const { inputText } = this.state;
    const { value } = event.target;
    const validQuery = inputText === '' ? '$QUERY' : inputText;
    const validId = value === '' ? '$CATEGORY_ID' : value;
    const dataFetch = await getProductsFromCategoryAndQuery(validId, validQuery);
    const validInput = dataFetch.results.length === 0;
    this.setState({
      search: dataFetch.results,
      isUndefined: validInput,
      inputText: '',
      isButtonDisable: true,
    });
  };

  onSaveCart = (product) => {
    this.setState((prev) => ({
      cartItems: [...prev.cartItems, product],
    }), () => {
      const { cartItems } = this.state;
      saveItem('cart', cartItems);
      this.setState({ cartLength: cartItems.length });
    });
  };

  render() {
    const { categories, isButtonDisable, inputText, search, isUndefined,
      cartLength } = this.state;
    return (
      <div>
        <div>
          <ul>
            {
              categories.map((categorie) => (
                <li key={ categorie.id }>
                  {categorie.name}
                  <button
                    type="button"
                    data-testid="category"
                    name={ categorie.id }
                    id={ categorie.id }
                    value={ categorie.id }
                    onClick={ this.onButtonClick }
                  >
                    a
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <label
          data-testid="home-initial-message"
          htmlFor="searchInput"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input
            type="text"
            name="inputText"
            id="searchInput"
            data-testid="query-input"
            onChange={ this.onInputChange }
            value={ inputText }
            placeholder="Procure o seu produto"
          />
        </label>
        <button
          type="button"
          data-testid="query-button"
          disabled={ isButtonDisable }
          onClick={ this.onButtonClick }
        >
          Pesquisar
        </button>
        {
          isUndefined ? (<h4>Nenhum produto foi encontrado</h4>) : (
            <ol>
              {search.map((eachProduct) => (
                <li data-testid="product" key={ eachProduct.id }>
                  <p>{ eachProduct.title }</p>
                  <p>{ eachProduct.price }</p>
                  <img src={ eachProduct.thumbnail } alt={ eachProduct.title } />
                  {
                    eachProduct.shipping.free_shipping
                    && <p data-testid="free-shipping">Frete grátis</p>
                  }
                  <button
                    data-testid="product-add-to-cart"
                    type="button"
                    onClick={ () => this.onSaveCart(eachProduct) }
                    name={ eachProduct.title }
                  >
                    Adicionar ao Carrinho
                  </button>
                  <Link
                    to={ `/pageCard/${eachProduct.id}` }
                    data-testid="product-detail-link"
                    params={ { name: eachProduct.title,
                      image: eachProduct.thumbnail,
                      price: eachProduct.price,
                      shipping: eachProduct.shipping.free_shipping,
                    } }
                  >
                    Datails
                  </Link>
                </li>
              ))}
            </ol>
          )
        }
        <Link
          className="shoppingCart"
          data-testid="shopping-cart-button"
          to="./ShoppingCart"
        >
          <p data-testid="shopping-cart-size">{ `ShoppingCart ${cartLength} items` }</p>
        </Link>
      </div>
    );
  }
}
export default InitialPage;
