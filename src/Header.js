import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import './Header.css';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Search from './Search';

function Header() {
  const [{ basket, user }] = useStateValue();
  const [input, setInput] = useState('');

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  }

  return (
    <div className='header'>
      <Link to='/'>
        <img
          className='header__logo'
          src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
          alt='amazon logo'
        />
      </Link>

      <div className="header__search">
        <form className='header_searchForm'>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='header__searchInput'
            type='text'
          />
          <Link to={{
            pathname: '/search',
            search: `${input}`
          }}>
            <button className='header__searchButton' type='submit'></button>
            <SearchIcon className='header__searchIcon' />
          </Link>
        </form>
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthentication} className="header__option">
            <span className='header__optionLineOne'>
              {user ? `Hello ${user.email.split(/[@]/)[0]}` : "Hello Guest"}
            </span>
            <span className='header__optionLineTwo'>
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to='/orders'>
          <div className="header__option">
            <span className='header__optionLineOne'>
              Returns
          </span>
            <span className='header__optionLineTwo'>
              & Orders
          </span>
          </div>
        </Link>
        <div className="header__option">
          <span className='header__optionLineOne'>
            Your
          </span>
          <span className='header__optionLineTwo'>
            Prime
          </span>
        </div>
      </div>

      <Link to='/checkout'>
        <div className="header__optionBasket">
          <ShoppingBasketIcon />
          <span className='header__optionLineTwo header__basketCount'>
            {basket ? basket.length : 0}
          </span>
        </div>
      </Link>
    </div>
  )
}

export default Header
