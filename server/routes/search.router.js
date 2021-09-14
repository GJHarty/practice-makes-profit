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
  axios({
    method: 'GET',
    url: 'https://finnhub.io/api/v1/quote',
    params: {
      token: process.env.FIN_API_KEY,
      symbol: req.query.symbol,
    },
  }).then(apiRes => {
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
  let time = new Date();

  const query = `
  INSERT INTO "purchasedStocks"
    ("userId", "stockSymbol", "quantity", "isBoughtOrSold", "timestamp", "price")
  VALUES
    ($1, $2, $3, $4, $5, $6);
  `;
  let params;

  if (!req.body.isBoughtOrSold) {
    params = [
      req.user.id,
      req.body.symbol,
      (req.body.quantity *= -1),
      req.body.isBoughtOrSold,
      time,
      req.body.price,]
  } else {
    params = [
      req.user.id,
      req.body.symbol,
      req.body.quantity,
      req.body.isBoughtOrSold,
      time,
      req.body.price,
    ];
  }

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
