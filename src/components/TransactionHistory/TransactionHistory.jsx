import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';


export default function TemplateFunction(props) {
  const store = useSelector((store) => store);


  return (
    <div>
      <h2>Transaction History</h2>
    </div>
  );
}
