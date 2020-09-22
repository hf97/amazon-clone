import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';
import './Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //singIn
  const signIn = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(auth => {
        history.push('/')
      })
      .catch(error => alert(error.message))
  }

  //register
  const register = e => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if(auth){
          history.push('/')
        }
      })
      .catch(error => alert(error.message));
  }

  return (
    <div className='login'>

      <Link to='/'>
        <img
          className='login__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt='logo'
        />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
          
          <h5>Password</h5>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <button type='submit' onClick={signIn} className='login__signInButton'>Sign in</button>
        </form>

        <p>
          This is a CLONE AMAZON website
        </p>

        <button onClick={register} className='login__registerButton'>Create your amazon account</button>

      </div>
    </div>
  )
}

export default Login
