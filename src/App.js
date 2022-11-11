import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import InitialPage from './pages/InitialPage';
import PageCard from './pages/PageCard';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ InitialPage } />
          <Route exact path="/ShoppingCart" component={ ShoppingCart } />
          <Route exact path="/pageCard/:id" component={ PageCard } />
          <Route exact path="/checkout" component={ Checkout } />
        </Switch>
      </div>
    );
  }
}

export default App;
