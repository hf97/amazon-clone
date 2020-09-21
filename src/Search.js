import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from './firebase';
import Product from './Product';
import './Search.css';

function Search() {
  const history = useHistory();
  const querie = window.location.search.replace('?', '');

  if (querie === '') history.replace('/');

  console.log(history)

  // console.log(querie)

  const [results, setResults] = useState([]);

  useEffect(() => {
    db
      .collection('products')
      .onSnapshot(snapshot => {
        snapshot.docs.map(item => {
          if (item.data().title.toLowerCase().includes(querie.toLowerCase())) {
            setResults(results => [...results, item.data()])
          }
        })
      })
  }, [history]);

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
