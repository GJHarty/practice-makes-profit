import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {  useSelector } from 'react-redux';
import round from '../../round';
import { Typography } from '@material-ui/core';

import logo from './images/white-text.jpg';

function Nav() {
  const user = useSelector((store) => store.user);
  

  return (
    <div className="nav">
      <Link to="/home">
        {/* <h2 className="nav-title">Practice Makes Profit</h2> */}
        <img src={logo} style={{height: '90px'}}/>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link classname="navLink" to="/portfolio" style={{color: 'white'}}> */}
            <p className="navLink">Available Balance: ${round(user.availableBalance)}</p>
            {/* </Link> */}
            <p className="navLink">Portfolio Value: ${round(user.accountBalance)}</p>
            &emsp;
            &emsp;
            <Link className="navLink" to="/search">
              Search
            </Link>
            <Link className="navLink" to="/portfolio">
              Portfolio
            </Link>
            <Link className="navLink" to="/watchlist">
              Watchlist
            </Link>
            <Link className="navLink" to="/info">
              Info
            </Link>
            &emsp;
            &emsp;
            &emsp;
            &emsp;
            &emsp;
            <Link className="navLink" to="/user">
              Account
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
