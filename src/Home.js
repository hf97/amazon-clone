import React, { useEffect, useState } from 'react';
import './Home.css';
import { db } from './firebase';
import Product from './Product';

function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    db
      .collection('products')
      .onSnapshot(snapshot => {
        setProdutos(snapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().title,
          image: doc.data().image,
          rating: doc.data().rating,
          price: doc.data().price
        })))
      })
  }, []);

  return (
    <div className='home'>
      <div className="home__container">
        <img
          className='home__image'
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
          alt='banner'
        />

        <div className="home__row">
          <Product
            key={produtos[3]?.id}
            id={produtos[3]?.id}
            title={produtos[3]?.title}
            price={produtos[3]?.price}
            image={produtos[3]?.image}
            rating={produtos[3]?.rating}
          />
          <Product
            key={produtos[1]?.id}
            id={produtos[1]?.id}
            title={produtos[1]?.title}
            price={produtos[1]?.price}
            image={produtos[1]?.image}
            rating={produtos[1]?.rating}
          />
        </div>

        <div className="home__row">
          <Product
            key={produtos[2]?.id}
            id={produtos[2]?.id}
            title={produtos[2]?.title}
            price={produtos[2]?.price}
            image={produtos[2]?.image}
            rating={produtos[2]?.rating}
          />
          <Product
            key={produtos[4]?.id}
            id={produtos[4]?.id}
            title={produtos[4]?.title}
            price={produtos[4]?.price}
            image={produtos[4]?.image}
            rating={produtos[4]?.rating}
          />
          <Product
            key={produtos[5]?.id}
            id={produtos[5]?.id}
            title={produtos[5]?.title}
            price={produtos[5]?.price}
            image={produtos[5]?.image}
            rating={produtos[5]?.rating}
          />
        </div>

        <div className="home__row">
          <Product
            key={produtos[0]?.id}
            id={produtos[0]?.id}
            title={produtos[0]?.title}
            price={produtos[0]?.price}
            image={produtos[0]?.image}
            rating={produtos[0]?.rating}
          />
        </div>
      </div>
    </div>
  )
};

export default Home
