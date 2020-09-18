import React from 'react';
import { useStateValue } from './StateProvider';
import './CheckoutProduct.css'

function CheckoutProduct({ id, title, image, price, rating, hideButton, numberOfItems }) {
  const [{ basket }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating
      }
    })
  }

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    })
  }

  return (
    <div className='checkoutProduct'>
      <img
        className='checkoutProduct__image'
        src={image}
        alt='product'
      />

      <div className="checkoutProduct__info">
        <p className='checkoutProduct__title'>
          {title}
        </p>
        <p className='checkoutProduct__price'>
          <small>€</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct__rating">
          {Array(rating).fill().map((_, i) => (
            <span role="img" aria-label="stars">⭐</span>
          ))}
        </div>
        {!hideButton && (
          <>
            <p>Number of items: {numberOfItems}</p>
            <button onClick={addToBasket}>Add to Basket</button>
            <button onClick={removeFromBasket}>Remove from basket</button>
          </>
        )}
      </div>
    </div>
  )
}

export default CheckoutProduct
