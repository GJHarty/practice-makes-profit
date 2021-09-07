import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);
  

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Practice Makes Profit</h2>
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
            <Link className="navLink" to="/search">
              Search
            </Link>
            <Link className="navLink" to="/current-holdings">
              Current Holdings
            </Link>
            <Link className="navLink" to="/watchlist">
              Watchlist
            </Link>
            <Link className="navLink" to="/how-to-use">
              How to Use
            </Link>
            <Link className="navLink" to="/info">
              Info
            </Link>

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