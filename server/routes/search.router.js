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
  console.log('req.user', req.user);
  console.log('Symbol', req.query.symbol);
  let date = new Date();
  let today = Math.round(Date.now() / 1000);

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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
