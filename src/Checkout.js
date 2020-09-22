import React, { useEffect } from 'react';
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
  const [{ basket, user }] = useStateValue();
  var seen = {};
  var elems = [];

  //makes basket dictionary with item and number of times in basket
  const countFunc = keys => {
    seen[keys.id] = ++seen[keys.id] || 1;
  }
  basket.forEach(countFunc);

  //display elems in basket one time
  for (const [key, value] of Object.entries(seen)) {
    var values = basket.find(item => {
      return item.id === key;
    })
    elems.push(values);
  }

  return (
    <div className='checkout'>
      <div className="checkout__left">
        <img
          className='checkout__ad'
          src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.png'
          alt='banner'
        />

        <div>
          <h2 className="checkout__title">Your shopping baskett</h2>

          {/* order items in basket by title */}
          {elems.sort((a, b) => a.title.localeCompare(b.title)).map(item => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              numberOfItems={basket.filter(v => v.id === item.id).length} // number of times element is in basket
            />
          )
          )}
        </div>
      </div>

      <div className="checkout__right">
        {/* only display subtotal if user is login */}
        <Subtotal user={user} />
      </div>
    </div>
  )
};

export default Checkout
