import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
            Hello and welcome to Practice Makes Profit. With the recent explosion of the housing market,
            my mother has been looking into selling her house, but she doesn’t exactly know what to do 
            with all that extra money. I told her to invest it in the stock market, but she said she doesn’t 
            really know where to begin. That’s why I started working on my app, Practice Makes Profit. 
            It allows a user to simulate trading stocks in real time using financial APIs, without taking 
            on any risk to your hard earned money. My app sets itself apart from the competition by focusing 
            on the basics, and helping educate the user on the process of trading so they don’t end up 
            drowning in a sea of knowledge. I urge you to invest some of your time into my app where there’s 
            no risk and high reward.
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
