import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { auth } from './firebase';
import './App.css';
import Checkout from './Checkout';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import Orders from './Orders';
import Search from './Search';

const promise = loadStripe('pk_test_51HRxpYFiopHTY411Bdft7gQjkdFUYefJ2KxWF2AxPV1ag8W50KN9hXMAs7mcqf9kjzDzDC04QhxzQC0mfDitIQud00SeY5pErQ');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/checkout'>
            <Header />
            <Checkout />
          </Route>

          <Route path='/payment'>
            <Header />
            <Elements stripe={promise} >
              <Payment />
            </Elements>
          </Route>
          
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          
          <Route path='/search'>
            <Header />
            <Search />
          </Route>

          <Route path='/'>
            <Header />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
