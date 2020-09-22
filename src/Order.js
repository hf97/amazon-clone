import React from 'react';
import './Order.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({ order }) {
  var seen = {};
  var elems = [];

  //makes basket dictionary with item and number of times in basket
  const countFunc = keys => {
    seen[keys.id] = ++seen[keys.id] || 1;
  }
  order.data.basket.forEach(countFunc);

  //display elems in basket one time
  for (const [key, value] of Object.entries(seen)) {
    var values = order.data.basket.find(item => {
      return item.id === key;
    })
    elems.push(values);
  }

  return (
    <div className='order'>
      <h2>Order</h2>

      <p>{moment.unix(order.data.created).format("DD/MM/YYYY h:mma")}</p>
      
      <p className="order__id">
        <small>{order.id}</small>
      </p>

      {elems?.map(item => (
        <CheckoutProduct
          key={item.key}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          numberOfItems={order.data.basket.filter(v => v.id === item.id).length} // number of times element is in basket
          hideButton
        />
      ))}

      <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className='order__total'>Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'€'}
      />
    </div>
  )
}

export default Order
