import React, { useState } from 'react';
import {useSelector} from 'react-redux';

export default function SearchPage(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const user = useSelector((store) => store.user);
  const [heading, setHeading] = useState('Search Page');

  return (
    <div>
      <h2>{heading}</h2>
      <h3>Available Balance: ${(Math.round(user.availableBalance * 100) / 100).toFixed(2)}</h3>
      
    </div>
  );
}

