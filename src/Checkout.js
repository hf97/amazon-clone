import React from 'react';
import FlipMove from 'react-flip-move';
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';
import Subtotal from './Subtotal';

function Checkout() {
  const [{ basket }, dispatch] = useStateValue();

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

          <FlipMove>
            {basket.map(item => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </FlipMove>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  )
};

export default Checkout