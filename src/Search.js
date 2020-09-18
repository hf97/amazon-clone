import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from './firebase';
import Product from './Product';
import './Search.css';

function Search() {
  const history = useHistory();
  const querie = window.location.search.replace('?', '');

  if(querie === '' ) history.replace('/');

  // console.log(querie)

  const [results, setResults] = useState([]);

  useEffect(() => {
    db
      .collection('products')
      .onSnapshot(snapshot => {
        snapshot.docs.map(item => {
          // console.log(item.data().title)
          // console.log(querie)
          if (item.data().title.toLowerCase().includes(querie.toLowerCase())) {
            setResults(results => [...results, item.data()])
          }
        })
      })
  }, [querie]);

  // console.log(results)

  return (
    <div className='search'>
      <h1>Results of searching: "{querie}" ({results.length} products)</h1>
      
      <div className='search__product'>
        {results.reverse().map(item => (
          <Product
            key={item?.id}
            id={item?.id}
            title={item?.title}
            price={item?.price}
            image={item?.image}
            rating={item?.rating}
          />
        ))}
      </div>
    </div>
  )
}

export default Search
