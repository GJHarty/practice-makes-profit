import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './LoadSpinner.css';


export default function LoadSpinner() {

  return (
    <div class="lds-dual-ring"></div>
  );
}
