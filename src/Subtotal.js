import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import { getBasketTotal } from './Reducer';
import { useStateValue } from './StateProvider';
import './Subtotal.css';

function Subtotal( {user} ) {
  const history = useHistory();
  const [{ basket }] = useStateValue();

  return user !== null ? (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong>{` ${value}`}</strong>
            </p>
            <small className='subtotal__gift'>
              <input type='checkbox' />
              This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"€"}
      />
      <button onClick={e => history.push('/payment')}>Proceed to Checkout</button>
    </div>
  ) : (
    <h1>Please login</h1>
  )
}

export default Subtotal
