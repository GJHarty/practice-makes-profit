require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const axios = require('axios');

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user', req.user);
    console.log('req.body', req.body);
    let time = new Date();
  
    const query = `
    INSERT INTO "watchlistedStocks"
      ("userId", "stockSymbol")
    VALUES
      ($1, $2);
    `;
  
    const params = [
      req.user.id,
      req.body.symbol,
    ];
    
    pool.query(query, params)
      .then(dbRes => {
        res.sendStatus(201);
      })
      .catch(err => {
        console.log('error posting purchased stock', err);
        res.sendStatus(500);
      });
  });

module.exports = router;