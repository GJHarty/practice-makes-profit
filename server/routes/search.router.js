require('dotenv').config();
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
const axios = require('axios');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log(req.query.symbol);
  axios({
    method: 'GET',
    url: 'https://finnhub.io/api/v1/quote',
    params: {
      token: process.env.FIN_API_KEY,
      symbol: req.query.symbol,
    },
  }).then(apiRes => {
    console.log('apiRes.data', apiRes.data);
    res.send(apiRes.data);
  }).catch(err => {
    console.log('finnhub error', err);
    res.sendStatus(500);
  });
});

/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('req.user', req.user);
  console.log('req.body', req.body);
  let time = new Date();

  const query = `
  INSERT INTO "purchasedStocks"
    ("userId", "stockSymbol", "quantity", "isBoughtOrSold", "timestamp", "price")
  VALUES
    ($1, $2, $3, $4, $5, $6);
  `;

  const params = [
    req.user.id,
    req.body.symbol,
    req.body.quantity,
    true,
    time,
    req.body.price,
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
