import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { db } from './firebase';
import Product from './Product';
import './Search.css';
import { useStateValue } from './StateProvider';

function Search() {
  const [{ search }] = useStateValue();
  const history = useHistory();
  //search link
  const querie = window.location.search.replace('?', '');

  if (querie === '') history.replace('/');

  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults([]);
    if (search || querie) {
      db
        .collection('products')
        .onSnapshot(snapshot => {
          snapshot.docs.map(item => {
            if (item.data().title.toLowerCase().includes(search.toLowerCase())) {
              setResults(results => [...results, item.data()])
            }
          })
        })
    }
  }, [history, querie, search]);

  return (
    <div className='search'>
      <h1>Results of searching: "{search || querie}" ({results.length} products)</h1>

      <div className='search__product'>
        {results.reverse().map(item => (
          <div className="search__row">
            <Product
              key={item?.id}
              id={item?.id}
              title={item?.title}
              price={item?.price}
              image={item?.image}
              rating={item?.rating}
            />
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Search
